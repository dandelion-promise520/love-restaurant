import { Text } from "react-native";

import { ThemedView } from "@/components/themed-view";

const Home = () => {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <Text className="text-pink-300">首页</Text>
    </ThemedView>
  );
};

export default Home;
