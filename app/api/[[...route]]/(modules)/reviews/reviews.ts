import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { reviewTable } from "@/db/models/review";
import { eq } from "drizzle-orm";
import { isValidUUID } from "@/lib/utils";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const reviewsApp = new Hono()
  .get("/", async (c) => {
    const productId = c.req.query("productId");
    if (!productId) {
      return c.json({ success: false, message: "productId is required" }, 400);
    }
    if (!isValidUUID(productId)) {
      return c.json({ success: false, message: "Invalid productId format" }, 400);
    }
    
    const reviews = await db.query.reviewTable.findMany({
      where: eq(reviewTable.productId, productId),
      with: {
        // Need to add relation in db models if we want user details, 
        // for now we just return the reviews.
      }
    });
    
    return c.json({ success: true, data: reviews });
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        userId: z.string().uuid(),
        productId: z.string().uuid(),
        rating: z.number().min(1).max(5),
        comment: z.string().max(1000).optional(),
      })
    ),
    async (c) => {
      const body = c.req.valid("json");
      const [newReview] = await db.insert(reviewTable).values(body).returning();
      return c.json({ success: true, data: newReview }, 201);
    }
  );

export default reviewsApp;
