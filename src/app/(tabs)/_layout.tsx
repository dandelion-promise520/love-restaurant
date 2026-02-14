import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";

import Couple from "./couple/Couple";
import Home from "./home/Home";
import Kitchen from "./kitchen/Kitchen";
import Orders from "./orders/Orders";

const TabsLayout = () => {
  const colorScheme = useColorScheme();
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarIndicator: () => <></>,
      }}
      tabBarPosition="bottom"
    >
      <Tab.Screen
        name="home/Home"
        component={Home}
        options={{
          title: "首页",
          tabBarIcon: ({ color }) => <Entypo name="home" size={16} color={color} />,
        }}
      ></Tab.Screen>
      <Tab.Screen
        component={Kitchen}
        name="kitchen/Kitchen"
        options={{
          title: "厨房",
          tabBarIcon: ({ color }) => <MaterialIcons name="restaurant" size={16} color={color} />,
        }}
      ></Tab.Screen>
      <Tab.Screen
        component={Orders}
        name="orders/Orders"
        options={{
          title: "订单",
          tabBarIcon: ({ color }) => <AntDesign name="unordered-list" size={16} color={color} />,
        }}
      ></Tab.Screen>
      <Tab.Screen
        component={Couple}
        name="couple/Couple"
        options={{
          title: "情侣",
          tabBarIcon: ({ color }) => <AntDesign name="heart" size={16} color={color} />,
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabsLayout;
