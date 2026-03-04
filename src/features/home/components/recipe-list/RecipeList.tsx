import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { JSX } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { ThemedText, ThemedView } from "@/components";

import { DishItem } from "../../../../components/dish-item";
import { RecipeListProps } from "./types";

export const RecipeList = ({ dishes, title }: RecipeListProps): JSX.Element => {
  return (
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
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              console.log(item.id);
            }}
          >
            <AntDesign name="heart" size={8} color="#f08080" />
          </TouchableOpacity>
        </ThemedView>
      )}
    />
  );
};
