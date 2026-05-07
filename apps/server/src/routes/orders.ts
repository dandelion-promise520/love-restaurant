import { Elysia, t } from "elysia";

import db from "../db";

interface OrderRow {
  id: string;
  user_id: string;
  total_price: number;
  status: string;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export const orderRoutes = new Elysia({ prefix: "/orders" })
  .get(
    "/",
    () => {
      const orders = db.query("SELECT * FROM orders ORDER BY created_at DESC").all();
      const result = orders.map((order: unknown) => {
        const row = order as OrderRow;
        const items = db.query("SELECT * FROM order_items WHERE order_id = ?").all(row.id);
        return {
          ...row,
          items,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          userId: row.user_id,
          totalPrice: row.total_price,
        };
      });
      return { success: true, data: result };
    },
    {
      detail: {
        tags: ["订单"],
        summary: "获取所有订单",
      },
    },
  )
  .post(
    "/",
    ({ body }) => {
      const id = `order_${Date.now()}`;
      const totalPrice = body.items.reduce(
        (sum: number, item: { price: number; quantity: number }) =>
          sum + item.price * item.quantity,
        0,
      );

      db.prepare(`
        INSERT INTO orders (id, user_id, total_price, status, note)
        VALUES (?, ?, ?, 'pending', ?)
      `).run(id, body.userId, totalPrice, body.note || null);

      const insertItem = db.prepare(`
        INSERT INTO order_items (order_id, dish_id, name, price, quantity)
        VALUES (?, ?, ?, ?, ?)
      `);

      for (const item of body.items) {
        insertItem.run(id, item.dishId, item.name, item.price, item.quantity);
      }

      const order = db.query("SELECT * FROM orders WHERE id = ?").get(id) as OrderRow;
      const items = db.query("SELECT * FROM order_items WHERE order_id = ?").all(id);

      return {
        success: true,
        data: {
          ...order,
          items,
          createdAt: order.created_at,
          updatedAt: order.updated_at,
          userId: order.user_id,
          totalPrice: order.total_price,
        },
      };
    },
    {
      body: t.Object({
        items: t.Array(
          t.Object({
            dishId: t.String(),
            name: t.String(),
            price: t.Number(),
            quantity: t.Number(),
          }),
        ),
        userId: t.String(),
        note: t.Optional(t.String()),
      }),
      detail: {
        tags: ["订单"],
        summary: "创建新订单",
      },
    },
  )
  .get(
    "/:id",
    ({ params: { id }, set }) => {
      const order = db.query("SELECT * FROM orders WHERE id = ?").get(id) as OrderRow | undefined;
      if (!order) {
        set.status = 404;
        return { success: false, message: "订单不存在" };
      }
      const items = db.query("SELECT * FROM order_items WHERE order_id = ?").all(id);
      return {
        success: true,
        data: {
          ...order,
          items,
          createdAt: order.created_at,
          updatedAt: order.updated_at,
          userId: order.user_id,
          totalPrice: order.total_price,
        },
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["订单"],
        summary: "根据 ID 获取订单",
      },
    },
  )
  .patch(
    "/:id/status",
    ({ params: { id }, body, set }) => {
      const order = db.query("SELECT * FROM orders WHERE id = ?").get(id) as OrderRow | undefined;
      if (!order) {
        set.status = 404;
        return { success: false, message: "订单不存在" };
      }

      db.prepare(`
        UPDATE orders SET status = ?, updated_at = datetime('now') WHERE id = ?
      `).run(body.status, id);

      const updated = db.query("SELECT * FROM orders WHERE id = ?").get(id) as OrderRow;
      const items = db.query("SELECT * FROM order_items WHERE order_id = ?").all(id);

      return {
        success: true,
        data: {
          ...updated,
          items,
          createdAt: updated.created_at,
          updatedAt: updated.updated_at,
          userId: updated.user_id,
          totalPrice: updated.total_price,
        },
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        status: t.Union([
          t.Literal("pending"),
          t.Literal("confirmed"),
          t.Literal("cooking"),
          t.Literal("ready"),
          t.Literal("completed"),
          t.Literal("cancelled"),
        ]),
      }),
      detail: {
        tags: ["订单"],
        summary: "更新订单状态",
      },
    },
  );
