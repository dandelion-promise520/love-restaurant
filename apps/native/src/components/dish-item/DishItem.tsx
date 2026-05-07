import { Image } from "expo-image";
import { View } from "react-native";

import defaultDishImage from "@/assets/images/defaultDishImage.png";

import { ThemedText } from "../themed-text";
import { DishItemProps } from "./types";

export const DishItem = ({ dish }: { dish: DishItemProps }) => {
  return (
    <View className="flex-1 flex-row items-center gap-[5]">
      {/* 图片部分 */}
      <Image
        source={dish.image || defaultDishImage}
        style={{
          height: 70,
          width: 70,
          borderRadius: 100,
        }}
      />

      {/* 文字部分 */}
      <View className="flex-1 items-start justify-start">
        {/* 食物名字 */}
        <ThemedText>{dish.name}</ThemedText>

        {/* 食物标签 */}
        {dish.tag && dish.tag.length > 0 && (
          <View className="flex-row flex-wrap gap-[4]">
            {dish.tag.map((tagItem) => (
              <ThemedText
                key={tagItem.name}
                style={{
                  borderColor: tagItem?.color || "#14CC60",
                  borderWidth: 1,
                  color: tagItem?.color || "#14CC60",
                  fontSize: 10,
                  lineHeight: 10,
                  padding: 2,
                }}
              >
                {tagItem.name}
              </ThemedText>
            ))}
          </View>
        )}

        {/* 食物描述 */}
        {dish.description && (
          <ThemedText style={{ fontSize: 10, color: "#7b7b7b" }}>{dish.description}</ThemedText>
        )}
      </View>
    </View>
  );
};
