// API 配置
// Web 版本使用相对路径（通过 nginx 反向代理）
// 移动端使用环境变量或默认地址
export const API_BASE_URL =
  typeof document !== "undefined"
    ? "" // Web: 相对路径
    : process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const API_V1 = `${API_BASE_URL}/api/v1`;

// 订单配置
export const MAX_ORDER_ITEMS = 20;
export const MAX_QUANTITY_PER_ITEM = 10;

// 菜品配置
export const DEFAULT_DISH_IMAGE = "defaultDishImage";
export const DISH_IMAGE_PLACEHOLDER = "https://placehold.co/300x200";

// 分类配置
export const CATEGORY_ICONS: Record<string, string> = {
  "baby-favorite": "baby-face-outline",
  "home-style": "home-outline",
  sichuan: "fire",
  cantonese: "pot-steam-outline",
  dessert: "cake-outline",
  drink: "cup-outline",
  "house-special": "star-outline",
};
