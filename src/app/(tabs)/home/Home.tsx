import { Text, View } from "react-native";

const Home = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-pink-300">首页</Text>
    </View>
  );
};

export default Home;
