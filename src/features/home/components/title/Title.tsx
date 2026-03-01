import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { View } from "react-native";

import boyAvatar from "@/assets/images/boy-avatar.jpg";
import girlAvatar from "@/assets/images/girl-avatar.jpg";
import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants";

import { TitleProps } from "./types";

export const Title = ({ title, boyName, girlName }: TitleProps) => {
  return (
    <ThemedView
      className="flex-row items-center justify-between rounded-b-[14] p-[14]"
      lightColor={Colors.light.white}
      darkColor={Colors.dark.black}
    >
      <ThemedText type="title">{title}</ThemedText>

      <View className="items-center justify-center">
        <ThemedText style={{ fontFamily: "MapleMono", fontSize: 10 }}>
          {boyName}
          <AntDesign name="heart" size={10} color="#f08080" />
          {girlName}
        </ThemedText>

        <View className="flex-row">
          <Image
            source={boyAvatar}
            style={{
              height: 20,
              width: 20,
              borderRadius: 100,
            }}
          />

          <Image
            source={girlAvatar}
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
  );
};
