import "@/assets/css/global.css";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MapleMono from "@/assets/font/MapleMono-NF-CN-Medium.ttf";
import { TabsLayout } from "@/layouts";

const App = () => {
  // 夜间模式还是白天模式
  const scheme = useColorScheme();

  // 加载字体
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        MapleMono,
      });
      setFontsLoaded(true);
    })();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <>
      {/* 状态栏 */}
      <StatusBar style={scheme === "dark" ? "dark" : "dark"} />

      {/* 导航容器 */}
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <TabsLayout />
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
};

export default App;
