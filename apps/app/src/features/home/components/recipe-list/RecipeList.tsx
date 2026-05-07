import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { JSX, useRef, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";

import { ThemedText, ThemedView } from "@/components";
import { AnimatedHeart } from "@/components/animated-heart";
import { useOrder } from "@/contexts/order-context";

import { DishItem, DishItemProps } from "../../../../components/dish-item";
import { RecipeListProps } from "./types";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const RecipeList = ({ dishes, title }: RecipeListProps): JSX.Element => {
  const { addItem } = useOrder();
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const heartIdRef = useRef(0);

  const handleAddItem = (
    item: DishItemProps & { price: number },
    event: { nativeEvent: { pageX: number; pageY: number } },
  ) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // 获取点击位置
    const { pageX, pageY } = event.nativeEvent;

    // 添加爱心到列表
    const newHeart = {
      id: heartIdRef.current++,
      x: pageX,
      y: pageY,
    };
    setHearts((prev) => [...prev, newHeart]);

    // 添加菜品到购物车
    addItem({
      dishId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginLeft: 10,
          marginBottom: 10,
          backgroundColor: "white",
          borderRadius: 14,
        }}
        contentContainerStyle={{
          padding: 14,
          gap: 24,
        }}
        data={dishes}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ThemedText type="title">{title}</ThemedText>}
        renderItem={({ item }) => (
          <ThemedView
            className="flex-row items-center justify-between"
            lightColor="#fff"
            darkColor="#fff"
          >
            {/* 左侧图片与文字部分 */}
            <DishItem dish={item} />

            {/* 右侧点单按钮 */}
            <TouchableOpacity
              className="size-[25] items-center justify-center rounded-full bg-[#fbc4ab]"
              onPress={(event) => handleAddItem(item, event)}
            >
              <AntDesign name="heart" size={8} color="#f08080" />
            </TouchableOpacity>
          </ThemedView>
        )}
      />

      {/* 爱心动画 */}
      {hearts.map((heart) => (
        <AnimatedHeart
          key={heart.id}
          startX={heart.x}
          startY={heart.y}
          targetX={SCREEN_WIDTH / 2}
          targetY={SCREEN_HEIGHT - 50} // 药丸位置
          onComplete={() => {
            setHearts((prev) => prev.filter((h) => h.id !== heart.id));
          }}
        />
      ))}
    </>
  );
};
