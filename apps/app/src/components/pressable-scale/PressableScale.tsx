import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { PressableScaleProps } from "./types";

export const PressableScale = ({ children, onPress, style, className }: PressableScaleProps) => {
  // 调用组件时如果style中有transform属性就拆出来放到动画组件中
  const flatten = StyleSheet.flatten(style);
  const externalTransform: ViewStyle["transform"] = Array.isArray(flatten?.transform)
    ? flatten.transform
    : [];

  // 按钮大小
  const buttonScale = useSharedValue(1);
  // 按钮动画样式
  const reButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [...externalTransform, { scale: buttonScale.value }],
    };
  });

  // 震动效果
  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // 手势操作
  const gesture = Gesture.Tap()
    .maxDuration(5000)
    .onTouchesDown(() => {
      buttonScale.set(withTiming(0.9));
    })
    .onTouchesUp(() => {
      buttonScale.set(withTiming(1));
      scheduleOnRN(onPress);
      scheduleOnRN(triggerHaptic);
    })
    .onFinalize(() => {
      buttonScale.set(withTiming(1));
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, reButtonStyle]} className={className}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};
