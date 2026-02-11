import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";

const TabsLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
      }}
    >
      <Tabs.Screen
        name="home/Home"
        options={{
          title: "首页",
          tabBarIcon: ({ color }) => <Entypo name="home" size={16} color={color} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="kitchen/Kitchen"
        options={{
          title: "厨房",
          tabBarIcon: ({ color }) => <MaterialIcons name="restaurant" size={16} color={color} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="orders/Orders"
        options={{
          title: "订单",
          tabBarIcon: ({ color }) => <AntDesign name="unordered-list" size={16} color={color} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="couple/Couple"
        options={{
          title: "情侣",
          tabBarIcon: ({ color }) => <AntDesign name="heart" size={16} color={color} />,
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default TabsLayout;
