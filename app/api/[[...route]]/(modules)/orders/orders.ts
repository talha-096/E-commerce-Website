import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { orderTable } from "@/db/models/order";
import { eq } from "drizzle-orm";
import { isValidUUID } from "@/lib/utils";

const ordersApp = new Hono()
  .get("/", async (c) => {
    const userId = c.req.query("userId");
    
    let query = db.query.orderTable.findMany();
    
    if (userId) {
      if (!isValidUUID(userId)) {
        return c.json({ success: false, message: "Invalid userId format" }, 400);
      }
      query = db.query.orderTable.findMany({
        where: eq(orderTable.userId, userId),
        orderBy: (orders, { desc }) => [desc(orders.createdAt)],
      });
    }

    const orders = await query;
    return c.json({ success: true, data: orders });
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    if (!isValidUUID(id)) {
      return c.json({ success: false, message: "Invalid order ID format" }, 400);
    }
    const order = await db.query.orderTable.findFirst({
      where: eq(orderTable.id, id),
    });
    if (!order)
      return c.json({ success: false, message: "Order not found" }, 404);
    return c.json({ success: true, data: order });
  });

export default ordersApp;
