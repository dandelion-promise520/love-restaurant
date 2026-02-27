import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants";

export const Orders = () => {
  return (
    <ThemedView
      className="flex-1 items-center justify-center"
      lightColor={Colors["light"].background}
      darkColor={Colors["dark"].background}
    >
      <ThemedText lightColor={Colors["light"].text} darkColor={Colors["dark"].text}>
        订单
      </ThemedText>
    </ThemedView>
  );
};
