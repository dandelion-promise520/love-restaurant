import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";

const Kitchen = () => {
  return (
    <SafeAreaView className="flex-1">
      <ThemedView
        className="flex-1 items-center justify-center"
        lightColor={Colors["light"].background}
        darkColor={Colors["dark"].background}
      >
        <ThemedText lightColor={Colors["light"].text} darkColor={Colors["dark"].text}>
          厨房
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
};

export default Kitchen;
