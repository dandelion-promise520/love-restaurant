import type { Dish, Order, User, ApiResponse } from "@love-restaurant/shared";

import { API_V1 } from "@love-restaurant/shared";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_V1) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "请求失败",
        };
      }

      return data;
    } catch (error) {
      console.error("API request error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "网络错误",
      };
    }
  }

  // 菜品相关
  async getDishes(): Promise<ApiResponse<Dish[]>> {
    return this.request("/dishes");
  }

  async getDish(id: string): Promise<ApiResponse<Dish>> {
    return this.request(`/dishes/${id}`);
  }

  async getDishesByCategory(category: string): Promise<ApiResponse<Dish[]>> {
    return this.request(`/dishes/category/${category}`);
  }

  // 订单相关
  async getOrders(): Promise<ApiResponse<Order[]>> {
    return this.request("/orders");
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    return this.request(`/orders/${id}`);
  }

  async createOrder(
    items: { dishId: string; name: string; price: number; quantity: number }[],
    userId: string,
    note?: string,
  ): Promise<ApiResponse<Order>> {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify({ items, userId, note }),
    });
  }

  async updateOrderStatus(id: string, status: Order["status"]): Promise<ApiResponse<Order>> {
    return this.request(`/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }

  // 用户相关
  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.request(`/users/${id}`);
  }

  async getPartner(userId: string): Promise<ApiResponse<User>> {
    return this.request(`/users/${userId}/partner`);
  }
}

export const apiClient = new ApiClient();
