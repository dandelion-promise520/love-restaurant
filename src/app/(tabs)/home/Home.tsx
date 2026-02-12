import { Image } from "expo-image";
import { FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import avatar from "@/assets/images/avatar.png";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
const Home = () => {
  const category = [
    { id: "1", name: "宝宝最爱" },
    { id: "2", name: "家常菜" },
  ];

  const dishes = [
    {
      id: "1",
      name: "西红柿鸡蛋面",
      tag: "营养均衡",
      description: "酸甜搭配超好吃",
    },
    {
      id: "2",
      name: "辣椒炒肉",
      tag: "宝宝最爱",
      description: "超级香",
    },
  ];

  return (
    <SafeAreaView className="flex-1 gap-[20]">
      {/* 标题部分 */}
      <ThemedView
        className="flex-row items-center justify-between rounded-b-[14] p-[14] shadow"
        lightColor={Colors["light"].white}
        darkColor={Colors["dark"].black}
      >
        <ThemedText type="title" lightColor="#1F2937">
          今天想吃什么?
        </ThemedText>
        <Image source={avatar} style={{ height: 17.5, width: 17.5, borderRadius: 100 }}></Image>
      </ThemedView>

      {/* 主体部分 */}
      <ThemedView className="flex-row">
        {/* 菜单分类部分 */}
        <FlatList
          className="p-[14]"
          data={category}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity className="">
              <ThemedText>{item.name}</ThemedText>
            </TouchableOpacity>
          )}
        ></FlatList>

        {/* 点餐部分 */}
        <FlatList
          className="rounded-[14] bg-white px-[5] py-[14]"
          data={dishes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView lightColor={Colors.light.white} className="flex-row items-center">
              <ThemedText>{item.name}</ThemedText>
            </ThemedView>
          )}
        ></FlatList>
      </ThemedView>
    </SafeAreaView>
  );
};

export default Home;
