import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "love-restaurant-cart";

export interface CartStorage {
  items: {
    dishId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  updatedAt: string;
}

export async function saveCart(items: CartStorage["items"]): Promise<void> {
  try {
    const data: CartStorage = {
      items,
      updatedAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to save cart:", error);
  }
}

export async function loadCart(): Promise<CartStorage["items"]> {
  try {
    const json = await AsyncStorage.getItem(CART_KEY);
    if (!json) return [];
    const data: CartStorage = JSON.parse(json);
    return data.items || [];
  } catch (error) {
    console.warn("Failed to load cart:", error);
    return [];
  }
}

export async function clearCartStorage(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (error) {
    console.warn("Failed to clear cart:", error);
  }
}
