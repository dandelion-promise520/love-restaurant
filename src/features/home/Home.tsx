import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, View } from "react-native";

import avatar from "@/assets/images/avatar.png";
import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants";

import { Menu, MenuItem } from "./components";

export const Home = () => {
  const category: MenuItem[] = [
    { id: "1", title: "宝宝最爱" },
    { id: "2", title: "家常菜" },
    { id: "3", title: "川菜" },
    { id: "4", title: "粤菜" },
    { id: "5", title: "甜品" },
    { id: "6", title: "面食" },
    { id: "7", title: "汤羹" },
    { id: "8", title: "素菜" },
    { id: "9", title: "肉菜" },
    { id: "10", title: "快手菜" },
    { id: "11", title: "减脂菜" },
    { id: "12", title: "儿童餐" },
  ];

  const [selectedId, setSelectedId] = useState("1");

  const dishes = [
    { id: "1", name: "西红柿鸡蛋面" },
    { id: "2", name: "辣椒炒肉" },
  ];

  return (
    <ThemedView
      className="flex-1 gap-[20]"
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      {/* 标题 */}
      <ThemedView
        className="flex-row items-center justify-between rounded-b-[14] p-[14]"
        lightColor={Colors.light.white}
        darkColor={Colors.dark.black}
      >
        <ThemedText type="title">今天想吃什么?</ThemedText>

        <View className="items-center justify-center">
          <ThemedText style={{ fontFamily: "MapleMono", fontSize: 10 }}>小刘❤️小朱</ThemedText>
          <View className="flex-row">
            <Image
              source={avatar}
              style={{
                height: 20,
                width: 20,
                borderRadius: 100,
              }}
            />

            <Image
              source={avatar}
              style={{
                height: 20,
                width: 20,
                borderRadius: 100,
                marginLeft: -4,
              }}
            />
          </View>
        </View>
      </ThemedView>

      {/* 主体 */}
      <ThemedView className="flex-1 flex-row">
        {/* 左侧菜单 */}
        <Menu data={category} selectedId={selectedId} onChange={(id) => setSelectedId(id)} />
        {/* 右侧内容 */}
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            marginLeft: 10,
            backgroundColor: "white",
            borderRadius: 14,
            padding: 14,
          }}
          data={dishes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView className="py-[12]" lightColor="#fff" darkColor="#fff">
              <ThemedText>{item.name}</ThemedText>
            </ThemedView>
          )}
        />
      </ThemedView>
    </ThemedView>
  );
};
