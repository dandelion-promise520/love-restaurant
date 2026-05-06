import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";
import { staticPlugin } from "@elysiajs/static";
import path from "path";

import { dishRoutes } from "./routes/dishes";
import { orderRoutes } from "./routes/orders";
import { userRoutes } from "./routes/users";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "Love Restaurant API",
          version: "0.1.0",
          description: "情侣点餐 App 后端 API",
        },
      },
    })
  )
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "love-restaurant-secret-key",
    })
  )
  .use(
    staticPlugin({
      assets: path.join(process.cwd(), "public"),
      prefix: "/public",
    })
  )
  .get("/", () => ({
    name: "Love Restaurant API",
    version: "0.1.0",
    status: "running",
  }))
  .get("/health", () => ({ status: "ok" }))
  .group("/api/v1", (app) =>
    app.use(dishRoutes).use(orderRoutes).use(userRoutes)
  )
  .listen(3000);

console.log(
  `🍽️ Love Restaurant API running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
