import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { productTable } from "@/db/models/product";
import { eq } from "drizzle-orm";
import { isValidUUID } from "@/lib/utils";

const sellerApp = new Hono()
  .get("/products", async (c) => {
    const sellerId = c.req.query("sellerId");
    if (!sellerId) return c.json({ success: false, message: "Missing sellerId" }, 400);
    if (!isValidUUID(sellerId)) return c.json({ success: false, message: "Invalid sellerId format" }, 400);

    const products = await db.query.productTable.findMany({
      where: eq(productTable.sellerId, sellerId),
    });

    return c.json({ success: true, data: products });
  })
  .get("/orders", async (c) => {
    const sellerId = c.req.query("sellerId");
    if (!sellerId) return c.json({ success: false, message: "Missing sellerId" }, 400);
    if (!isValidUUID(sellerId)) return c.json({ success: false, message: "Invalid sellerId format" }, 400);

    // Get products for this seller
    const sellerProducts = await db.query.productTable.findMany({
      where: eq(productTable.sellerId, sellerId),
      columns: { id: true }
    });
    
    if (sellerProducts.length === 0) {
      return c.json({ success: true, data: [] });
    }

    const productIds = new Set(sellerProducts.map(p => p.id));

    // Get all orders (since items are JSONB, we filter in memory for simplicity in this demo)
    const allOrders = await db.query.orderTable.findMany();

    const sellerOrders = allOrders.filter(order => {
      const items = (order.items as { productId?: string; id?: string }[]) || [];
      return items.some(item => productIds.has((item.productId || item.id) as string));
    });

    return c.json({ success: true, data: sellerOrders });
  });

export default sellerApp;
