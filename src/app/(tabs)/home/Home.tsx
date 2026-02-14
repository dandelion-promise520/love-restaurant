import { Image } from "expo-image";
import { useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import avatar from "@/assets/images/avatar.png";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { Menu, MenuItem } from "@/features/menu";

const Home = () => {
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
    <SafeAreaView style={{ flex: 1 }}>
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

          <Image
            source={avatar}
            style={{
              height: 17.5,
              width: 17.5,
              borderRadius: 100,
            }}
          />
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
    </SafeAreaView>
  );
};

export default Home;
