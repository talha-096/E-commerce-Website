import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { productTable } from "@/db/models/product";
import { eq } from "drizzle-orm";
import { isValidUUID } from "@/lib/utils";

const productsApp = new Hono()
  .get("/", async (c) => {
    const products = await db.query.productTable.findMany();
    if (!products || products.length === 0)
      return c.json({ success: false, message: "No products found" }, 404);
    return c.json({ success: true, data: products });
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    if (!isValidUUID(id)) {
      return c.json({ success: false, message: "Invalid product ID format" }, 400);
    }
    const product = await db.query.productTable.findFirst({
      where: eq(productTable.id, id),
    });
    if (!product)
      return c.json({ success: false, message: "Product not found" }, 404);
    return c.json({ success: true, data: product });
  });

export default productsApp;
