// 菜品分类
export type DishCategory =
  | "baby-favorite" // 宝宝最爱
  | "home-style" // 家常菜
  | "sichuan" // 川菜
  | "cantonese" // 粤菜
  | "dessert" // 甜品
  | "drink" // 饮品
  | "house-special"; // 招牌菜

// 菜品
export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  image: string;
  tags: string[];
  available: boolean;
}

// 订单状态
export type OrderStatus =
  | "pending" // 待确认
  | "confirmed" // 已确认
  | "cooking" // 制作中
  | "ready" // 可取餐
  | "completed" // 已完成
  | "cancelled"; // 已取消

// 订单项
export interface OrderItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
}

// 订单
export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  note?: string;
}

// 用户
export interface User {
  id: string;
  name: string;
  avatar: string;
  partnerId?: string;
}

// API 响应
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// 菜品分类显示名称
export const DISH_CATEGORY_LABELS: Record<DishCategory, string> = {
  "baby-favorite": "宝宝最爱",
  "home-style": "家常菜",
  sichuan: "川菜",
  cantonese: "粤菜",
  dessert: "甜品",
  drink: "饮品",
  "house-special": "招牌菜",
};

// 订单状态显示名称
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "待确认",
  confirmed: "已确认",
  cooking: "制作中",
  ready: "可取餐",
  completed: "已完成",
  cancelled: "已取消",
};
