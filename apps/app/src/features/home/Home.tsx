import { DISH_CATEGORY_LABELS } from "@love-restaurant/shared";
import { useState, useMemo } from "react";
import { ActivityIndicator } from "react-native";

import { ThemedView, ThemedText } from "@/components";
import { Colors } from "@/constants";
import { useDishes } from "@/hooks/use-api";

import { MenuList, RecipeList, Title } from "./components";
import { OrderModal } from "./components/order-modal";

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("baby-favorite");
  const { data: dishes, loading, error } = useDishes();

  // 从 API 数据生成分类列表
  const categories = useMemo(() => {
    if (!dishes) return [];
    const uniqueCategories = [...new Set(dishes.map((d) => d.category))];
    return uniqueCategories.map((cat) => ({
      id: cat,
      title: DISH_CATEGORY_LABELS[cat as keyof typeof DISH_CATEGORY_LABELS] || cat,
    }));
  }, [dishes]);

  // 根据选中分类过滤菜品
  const filteredDishes = useMemo(() => {
    if (!dishes) return [];
    return dishes.filter((d) => d.category === selectedCategory);
  }, [dishes, selectedCategory]);

  if (loading) {
    return (
      <ThemedView
        className="flex-1 items-center justify-center"
        lightColor={Colors.light.background}
        darkColor={Colors.dark.background}
      >
        <ActivityIndicator size="large" color="#f9a03f" />
        <ThemedText className="mt-4 text-gray-500">加载菜品中...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView
        className="flex-1 items-center justify-center"
        lightColor={Colors.light.background}
        darkColor={Colors.dark.background}
      >
        <ThemedText className="text-red-500">{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView
      className="flex-1 gap-[20]"
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      {/* 标题 */}
      <Title title="今天想吃什么？" boyName="小朱" girlName="小刘" />

      {/* 主体 */}
      <ThemedView className="flex-1 flex-row">
        {/* 左侧菜单 */}
        <MenuList
          data={categories}
          selectedId={selectedCategory}
          onChange={(id) => setSelectedCategory(id)}
        />

        {/* 右侧内容 */}
        <RecipeList
          dishes={filteredDishes.map((d) => ({
            id: d.id,
            name: d.name,
            image: d.image,
            tag: d.tags.map((t) => ({ name: t })),
            description: d.description,
            price: d.price,
          }))}
          title={categories.find((item) => item.id === selectedCategory)?.title || ""}
        />
      </ThemedView>

      {/* 底部已选订单部分 */}
      <OrderModal />
    </ThemedView>
  );
};
