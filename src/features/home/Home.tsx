import { useState } from "react";

import { ThemedView } from "@/components";
import { Colors } from "@/constants";

import { MenuList, RecipeList, Title } from "./components";
import { OrderModal } from "./components/order-modal";
import { CATEGORY, DISHES } from "./constants";

export const Home = () => {
  const [selectedId, setSelectedId] = useState<string>("1");

  return (
    <ThemedView
      className="flex-1 gap-[20]"
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      {/* 标题 */}
      <Title title="今天想吃什么？" boyName="小刘" girlName="小朱" />

      {/* 主体 */}
      <ThemedView className="flex-1 flex-row">
        {/* 左侧菜单 */}
        <MenuList data={CATEGORY} selectedId={selectedId} onChange={(id) => setSelectedId(id)} />

        {/* 右侧内容 */}
        <RecipeList
          dishes={DISHES}
          title={CATEGORY.find((item) => item.id === selectedId)?.title || ""}
        />
      </ThemedView>

      {/* 底部已选订单部分 */}
      <OrderModal />
    </ThemedView>
  );
};
