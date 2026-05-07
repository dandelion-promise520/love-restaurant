import { Elysia, t } from "elysia";

import db from "../db";

interface UserRow {
  id: string;
  name: string;
  avatar: string;
  partner_id: string | null;
  created_at: string;
}

export const userRoutes = new Elysia({ prefix: "/users" })
  .get(
    "/:id",
    ({ params: { id }, set }) => {
      const user = db.query("SELECT * FROM users WHERE id = ?").get(id) as UserRow | undefined;
      if (!user) {
        set.status = 404;
        return { success: false, message: "用户不存在" };
      }
      return {
        success: true,
        data: {
          ...user,
          partnerId: user.partner_id,
          createdAt: user.created_at,
        },
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["用户"],
        summary: "获取用户信息",
      },
    },
  )
  .get(
    "/:id/partner",
    ({ params: { id }, set }) => {
      const user = db.query("SELECT * FROM users WHERE id = ?").get(id) as UserRow | undefined;
      if (!user || !user.partner_id) {
        set.status = 404;
        return { success: false, message: "未找到伴侣" };
      }
      const partner = db.query("SELECT * FROM users WHERE id = ?").get(user.partner_id) as
        | UserRow
        | undefined;
      if (!partner) {
        set.status = 404;
        return { success: false, message: "伴侣不存在" };
      }
      return {
        success: true,
        data: {
          ...partner,
          partnerId: partner.partner_id,
          createdAt: partner.created_at,
        },
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["用户"],
        summary: "获取伴侣信息",
      },
    },
  );
