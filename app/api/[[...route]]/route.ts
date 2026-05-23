import { Hono } from "hono";
import { logger } from "hono/logger";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { handle } from "hono/vercel";

import users from "./(modules)/users/users";
import auth from "./(modules)/auth/auth";
import products from "./(modules)/products/products";
import reviews from "./(modules)/reviews/reviews";
import orders from "./(modules)/orders/orders";
import seller from "./(modules)/seller/seller";
import admin from "./(modules)/admin/admin";

const app = new Hono().basePath("/api");
app.use("*", logger());
const routes = app
  .route("/users", users)
  .route("/auth", auth)
  .route("/products", products)
  .route("/reviews", reviews)
  .route("/orders", orders)
  .route("/seller", seller)
  .route("/admin", admin);

routes.onError((err, c) => {
  console.error(err);
  if (
    err &&
    typeof err === "object" &&
    "status" in err &&
    "errors" in err &&
    Array.isArray(err.errors)
  ) {
    return c.json(
      { success: false, message: err.errors[0].message },
      err.status as unknown as ContentfulStatusCode
    );
  }
  return c.json(
    { success: false, message: "Internal server error", error: err.message },
    500
  );
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
