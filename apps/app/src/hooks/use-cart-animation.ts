import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from "react-native-reanimated";

export function useCartAnimation() {
  const jellyX = useSharedValue(0);
  const bgColor = useSharedValue("#e2e5eb");

  // 果冻抖动动画
  const triggerJelly = () => {
    jellyX.value = withSequence(
      withSpring(-10, { damping: 2, stiffness: 200 }),
      withSpring(10, { damping: 2, stiffness: 200 }),
      withSpring(-5, { damping: 2, stiffness: 200 }),
      withSpring(0, { damping: 2, stiffness: 200 }),
    );
  };

  // 背景色变化
  const triggerBgColor = (hasItems: boolean) => {
    bgColor.value = withTiming(hasItems ? "#F59E0B" : "#e2e5eb", {
      duration: 300,
    });
  };

  // 药丸样式
  const jellyStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: jellyX.value }],
  }));

  // 背景色样式
  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: bgColor.value,
  }));

  return {
    jellyStyle,
    bgStyle,
    triggerJelly,
    triggerBgColor,
  };
}
