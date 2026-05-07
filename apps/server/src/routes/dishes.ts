import { Elysia, t } from "elysia";

import db from "../db";

interface DishRow {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tags: string;
  available: number;
}

export const dishRoutes = new Elysia({ prefix: "/dishes" })
  .get(
    "/",
    () => {
      const dishes = db.query("SELECT * FROM dishes WHERE available = 1").all();
      return {
        success: true,
        data: dishes.map((d: unknown) => {
          const row = d as DishRow;
          return {
            ...row,
            tags: JSON.parse(row.tags),
            available: Boolean(row.available),
          };
        }),
      };
    },
    {
      detail: {
        tags: ["菜品"],
        summary: "获取所有菜品",
      },
    },
  )
  .get(
    "/:id",
    ({ params: { id }, set }) => {
      const dish = db.query("SELECT * FROM dishes WHERE id = ?").get(id) as DishRow | undefined;
      if (!dish) {
        set.status = 404;
        return { success: false, message: "菜品不存在" };
      }
      return {
        success: true,
        data: {
          ...dish,
          tags: JSON.parse(dish.tags),
          available: Boolean(dish.available),
        },
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["菜品"],
        summary: "根据 ID 获取菜品",
      },
    },
  )
  .get(
    "/category/:category",
    ({ params: { category } }) => {
      const dishes = db
        .query("SELECT * FROM dishes WHERE category = ? AND available = 1")
        .all(category);
      return {
        success: true,
        data: dishes.map((d: unknown) => {
          const row = d as DishRow;
          return {
            ...row,
            tags: JSON.parse(row.tags),
            available: Boolean(row.available),
          };
        }),
      };
    },
    {
      params: t.Object({
        category: t.String(),
      }),
      detail: {
        tags: ["菜品"],
        summary: "根据分类获取菜品",
      },
    },
  );
