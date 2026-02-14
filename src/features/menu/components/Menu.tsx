import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useRef } from "react";
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  createAnimatedComponent,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";

export type MenuItem = {
  id: string;
  title: string;
};

type Props = {
  data: MenuItem[];

  selectedId: string;

  onChange: (id: string, index: number) => void;

  width?: number;

  itemHeight?: number;

  style?: StyleProp<ViewStyle>;
};

const AnimatedFlatList = createAnimatedComponent(FlatList<MenuItem>);

export const Menu: React.FC<Props> = ({
  data,
  selectedId,
  onChange,
  width = 80,
  itemHeight = 48,
  style,
}) => {
  const listRef = useRef<FlatList<MenuItem>>(null);

  /**
   * 当前选中 index
   */
  const selectedIndex = useMemo(() => {
    return data.findIndex((i) => i.id === selectedId);
  }, [data, selectedId]);

  /**
   * indicator 真实位置
   */
  const indicatorY = useSharedValue(selectedIndex * itemHeight);

  /**
   * scroll 偏移
   */
  const scrollY = useSharedValue(0);

  /**
   * indicator 动画样式
   */
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: indicatorY.value - scrollY.value,
        },
      ],
    };
  });

  /**
   * gradient 动画样式
   */
  const gradientStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: indicatorY.value - scrollY.value,
        },
      ],
    };
  });

  /**
   * 点击菜单
   */
  const handlePress = (id: string, index: number) => {
    /**
     * 动画
     */
    indicatorY.value = withTiming(index * itemHeight, { duration: 250 });

    /**
     * 回调
     */
    onChange(id, index);

    /**
     * 自动滚动菜单
     */
    listRef.current?.scrollToOffset({
      offset: Math.max(0, index * itemHeight - itemHeight * 3),
      animated: true,
    });
  };

  /**
   * FlatList 滚动同步
   */
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = e.nativeEvent.contentOffset.y;
  };

  /**
   * 渲染 item
   */
  const renderItem: ListRenderItem<MenuItem> = ({ item, index }) => {
    const selected = item.id === selectedId;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handlePress(item.id, index)}
        style={{
          height: itemHeight,
          width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText
          lightColor={selected ? "#1D2129" : "#4E5969"}
          darkColor={selected ? "#1D2129" : "#4E5969"}
        >
          {item.title}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        {
          width,
          overflow: "hidden",
        },
        style,
      ]}
    >
      {/* 渐变背景 */}
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            width,
            height: itemHeight,
          },
          gradientStyle,
        ]}
      >
        <LinearGradient
          colors={["#D9D9D999", "#F5F5F582"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ flex: 1 }}
        />
      </Animated.View>

      {/* indicator */}
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            left: 0,
            width: 3,
            height: 38,
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
            backgroundColor: "#F9A03F",
            top: (itemHeight - 38) / 2,
          },
          indicatorStyle,
        ]}
      />

      {/* 菜单 */}
      <AnimatedFlatList
        ref={listRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
      />
    </View>
  );
};
