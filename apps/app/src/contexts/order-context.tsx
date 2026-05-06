import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { useCreateOrder } from "@/hooks/use-api";
import { saveCart, loadCart, clearCartStorage } from "@/lib/storage";

interface CartItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  submitOrder: (note?: string) => Promise<boolean>;
  submitting: boolean;
  error: string | null;
  onItemAdded: (callback: () => void) => void; // 添加回调函数
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { createOrder, loading: submitting, error } = useCreateOrder();
  const itemAddedCallbackRef = useRef<(() => void) | null>(null);

  // 初始化时加载购物车
  useEffect(() => {
    loadCart().then((savedItems) => {
      if (savedItems.length > 0) {
        setItems(savedItems);
      }
    });
  }, []);

  // 自动保存购物车
  useEffect(() => {
    if (items.length > 0) {
      saveCart(items);
    } else {
      clearCartStorage();
    }
  }, [items]);

  // 注册回调函数
  const onItemAdded = useCallback((callback: () => void) => {
    itemAddedCallbackRef.current = callback;
  }, []);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.dishId === item.dishId);
      if (existing) {
        return prev.map((i) =>
          i.dishId === item.dishId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    // 触发回调
    if (itemAddedCallbackRef.current) {
      itemAddedCallbackRef.current();
    }
  }, []);

  const removeItem = useCallback((dishId: string) => {
    setItems((prev) => prev.filter((i) => i.dishId !== dishId));
  }, []);

  const updateQuantity = useCallback((dishId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.dishId !== dishId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.dishId === dishId ? { ...i, quantity } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    clearCartStorage();
  }, []);

  const submitOrder = useCallback(
    async (note?: string) => {
      if (items.length === 0) return false;

      const result = await createOrder(
        items.map((item) => ({
          dishId: item.dishId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        "1", // 默认用户 ID
        note
      );

      if (result) {
        clearCart();
        return true;
      }
      return false;
    },
    [items, createOrder, clearCart]
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        submitOrder,
        submitting,
        error,
        onItemAdded,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
