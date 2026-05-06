import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import { LOCAL_DISHES } from "@/data/local-dishes";
import type { Dish, Order, User } from "@love-restaurant/shared";

// 通用 hook 状态
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// 菜品 hooks
export function useDishes() {
  const [state, setState] = useState<UseApiState<Dish[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchDishes = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    const result = await apiClient.getDishes();

    // 如果 API 失败，使用本地数据
    if (!result.success || !result.data) {
      console.log("API unavailable, using local data");
      setState({
        data: LOCAL_DISHES as Dish[],
        loading: false,
        error: null, // 不显示错误，静默降级
      });
    } else {
      setState({
        data: result.data,
        loading: false,
        error: null,
      });
    }
  }, []);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  return { ...state, refetch: fetchDishes };
}

export function useDish(id: string) {
  const [state, setState] = useState<UseApiState<Dish>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchDish = async () => {
      const result = await apiClient.getDish(id);
      setState({
        data: result.data || null,
        loading: false,
        error: result.success ? null : result.message || "获取菜品失败",
      });
    };
    fetchDish();
  }, [id]);

  return state;
}

export function useDishesByCategory(category: string) {
  const [state, setState] = useState<UseApiState<Dish[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchDishes = async () => {
      const result = await apiClient.getDishesByCategory(category);
      setState({
        data: result.data || null,
        loading: false,
        error: result.success ? null : result.message || "获取菜品失败",
      });
    };
    fetchDishes();
  }, [category]);

  return state;
}

// 订单 hooks
export function useOrders() {
  const [state, setState] = useState<UseApiState<Order[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchOrders = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    const result = await apiClient.getOrders();
    setState({
      data: result.data || null,
      loading: false,
      error: result.success ? null : result.message || "获取订单失败",
    });
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { ...state, refetch: fetchOrders };
}

export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = useCallback(
    async (
      items: { dishId: string; name: string; price: number; quantity: number }[],
      userId: string,
      note?: string
    ) => {
      setLoading(true);
      setError(null);
      const result = await apiClient.createOrder(items, userId, note);
      setLoading(false);

      if (!result.success) {
        setError(result.message || "创建订单失败");
        return null;
      }

      return result.data;
    },
    []
  );

  return { createOrder, loading, error };
}

// 用户 hooks
export function useUser(id: string) {
  const [state, setState] = useState<UseApiState<User>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const result = await apiClient.getUser(id);
      setState({
        data: result.data || null,
        loading: false,
        error: result.success ? null : result.message || "获取用户失败",
      });
    };
    fetchUser();
  }, [id]);

  return state;
}

export function usePartner(userId: string) {
  const [state, setState] = useState<UseApiState<User>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchPartner = async () => {
      const result = await apiClient.getPartner(userId);
      setState({
        data: result.data || null,
        loading: false,
        error: result.success ? null : result.message || "获取伴侣失败",
      });
    };
    fetchPartner();
  }, [userId]);

  return state;
}
