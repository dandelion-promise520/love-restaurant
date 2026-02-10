import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home/Home" options={{ title: "首页" }}></Tabs.Screen>
      <Tabs.Screen name="kitchen/Kitchen" options={{ title: "厨房" }}></Tabs.Screen>
      <Tabs.Screen name="orders/Orders" options={{ title: "订单" }}></Tabs.Screen>
      <Tabs.Screen name="couple/Couple" options={{ title: "情侣" }}></Tabs.Screen>
    </Tabs>
  );
};

export default TabsLayout;
