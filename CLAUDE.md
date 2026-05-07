# love-restaurant — 情侣点餐 App

## 项目概述

Turborepo monorepo 项目，包含 Expo 前端和 Elysia 后端。

## 技术栈

### 前端 (apps/native)

- **Expo SDK 55** + React Native 0.83 + TypeScript (strict)
- **NativeWind v5 preview** (Tailwind CSS for RN)
- **React Navigation v7** (Material Top Tabs, bottom tab bar)
- **@gorhom/bottom-sheet** 底部弹窗
- **@legendapp/list** 高性能列表
- **expo-image** / **expo-haptics** 等 Expo 模块
- **oxlint** / **oxfmt** 代码规范

### 后端 (apps/server)

- **Elysia** — 高性能 TypeScript web 框架（基于 Bun）
- **bun:sqlite** — Bun 原生 SQLite 数据库
- **@elysiajs/cors** — 跨域支持
- **@elysiajs/swagger** — 自动 API 文档

### 共享 (packages/shared)

- 前后端共享的类型定义和常量

## 项目结构

```
love-restaurant/
├── apps/
│   ├── native/        # Expo 前端
│   └── server/        # Elysia 后端
├── packages/
│   ├── shared/        # 共享类型、常量
├── turbo.json         # Turborepo 配置
└── package.json       # 根 package.json
```

## 关键命令

```bash
# 安装依赖
bun install

# 开发模式
bun run dev              # 同时启动前后端
bun run dev:native          # 仅前端
bun run dev:server       # 仅后端

# 构建
bun run build            # 构建所有
bun run build:native        # 仅前端
bun run build:server     # 仅后端

# 代码检查与格式化
bun run lint             # lint 所有 (oxlint)
bun run fmt:check        # 格式化检查 (oxfmt)
bun run typecheck        # 类型检查所有
```

## 路径别名

- `@/` → `./src/`（前端项目中，babel + tsconfig 已配置）

## 代码规范

- **前端规范**：
  - 函数组件 + TypeScript，props 类型放 `types.ts`
  - 样式用 NativeWind className，主题色用 ThemedView/ThemedText 的 lightColor/darkColor
  - 组件文件 PascalCase，hooks kebab-case，常量 UPPER_SNAKE_CASE
- **Git Commit**：
  - 统一使用 conventional commits + emoji (已配置 commitlint 和 root husky)
  - 运行 `bun run commit` 调用 `git-cz` 进行提交。

## API 端点

后端运行在 `http://localhost:3000`

| 端点                                | 方法  | 说明           |
| ----------------------------------- | ----- | -------------- |
| `/`                                 | GET   | API 信息       |
| `/health`                           | GET   | 健康检查       |
| `/api/v1/dishes`                    | GET   | 获取所有菜品   |
| `/api/v1/dishes/:id`                | GET   | 获取单个菜品   |
| `/api/v1/dishes/category/:category` | GET   | 按分类获取菜品 |
| `/api/v1/orders`                    | GET   | 获取所有订单   |
| `/api/v1/orders`                    | POST  | 创建订单       |
| `/api/v1/orders/:id`                | GET   | 获取单个订单   |
| `/api/v1/orders/:id/status`         | PATCH | 更新订单状态   |
| `/api/v1/users/:id`                 | GET   | 获取用户信息   |
| `/api/v1/users/:id/partner`         | GET   | 获取伴侣信息   |
| `/swagger`                          | GET   | API 文档       |

## 数据库

使用 Bun 原生 SQLite（`bun:sqlite`），数据库文件：`apps/server/love-restaurant.db`

### 表结构

- `dishes` — 菜品表
- `orders` — 订单表
- `order_items` — 订单项表
- `users` — 用户表

## 前端 API 集成

- `src/lib/api-client.ts` — API 客户端封装
- `src/hooks/use-api.ts` — React hooks（useDishes, useOrders, useCreateOrder 等）
- `src/contexts/order-context.tsx` — 订单状态管理（购物车）

## 当前状态

- ✅ Turborepo monorepo 结构
- ✅ Elysia 后端 + SQLite 数据库
- ✅ 共享类型包
- ✅ 前端 API 集成
- ✅ 订单功能（购物车 + 提交）
- ✅ Monorepo 级别全局配置 (oxlint, commitlint, typescript, husky)
