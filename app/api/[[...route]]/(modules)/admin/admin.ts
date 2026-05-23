import { Hono } from "hono";
import { db } from "@/db/drizzle";

const adminApp = new Hono()
  .get("/stats", async (c) => {
    // Basic stats for admin dashboard
    const users = await db.query.userTable.findMany({ columns: { id: true } });
    const products = await db.query.productTable.findMany({ columns: { id: true } });
    const orders = await db.query.orderTable.findMany({ columns: { id: true } });
    const coupons = await db.query.couponTable.findMany({ columns: { id: true } });

    return c.json({
      success: true,
      data: {
        totalUsers: users.length,
        totalProducts: products.length,
        totalOrders: orders.length,
        totalCoupons: coupons.length
      }
    });
  })
  .get("/users", async (c) => {
    const users = await db.query.userTable.findMany();
    return c.json({ success: true, data: users });
  })
  .get("/products", async (c) => {
    const products = await db.query.productTable.findMany();
    return c.json({ success: true, data: products });
  })
  .get("/orders", async (c) => {
    const orders = await db.query.orderTable.findMany();
    return c.json({ success: true, data: orders });
  })
  .get("/coupons", async (c) => {
    const coupons = await db.query.couponTable.findMany();
    return c.json({ success: true, data: coupons });
  });

export default adminApp;
