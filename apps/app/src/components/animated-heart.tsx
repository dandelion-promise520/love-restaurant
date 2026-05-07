import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  runOnJS,
  Easing,
} from "react-native-reanimated";

interface AnimatedHeartProps {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  onComplete: () => void;
}

export function AnimatedHeart({
  startX,
  startY,
  targetX,
  targetY,
  onComplete,
}: AnimatedHeartProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // 计算相对移动距离
    const deltaX = targetX - startX;
    const deltaY = targetY - startY;

    // 水平移动
    translateX.value = withTiming(deltaX, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });

    // 垂直移动（弹跳效果）
    translateY.value = withSequence(
      withTiming(deltaY * 0.3, { duration: 150, easing: Easing.out(Easing.cubic) }),
      withSpring(deltaY * 0.6, { damping: 2, stiffness: 100 }),
      withSpring(deltaY * 0.8, { damping: 2, stiffness: 100 }),
      withSpring(deltaY, { damping: 2, stiffness: 100 }),
    );

    // 缩放效果
    scale.value = withSequence(
      withTiming(1.2, { duration: 100 }),
      withTiming(0.8, { duration: 100 }),
      withTiming(1, { duration: 100 }),
    );

    // 动画完成后淡出
    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(onComplete)();
      });
    }, 600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: startX,
          top: startY,
          zIndex: 1000,
        },
        animatedStyle,
      ]}
    >
      <AntDesign name="heart" size={24} color="#f08080" />
    </Animated.View>
  );
}
