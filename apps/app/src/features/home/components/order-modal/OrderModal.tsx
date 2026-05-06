import BottomSheet, { useBottomSheetScrollableCreator } from "@gorhom/bottom-sheet";
import { LegendList } from "@legendapp/list";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import Animated from "react-native-reanimated";

import boyAvatar from "@/assets/images/boy-avatar.jpg";
import { DishItem, DishItemProps, PressableScale } from "@/components";
import { useOrder } from "@/contexts/order-context";
import { useCartAnimation } from "@/hooks/use-cart-animation";

export const OrderModal = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const BottomSheetScrollable = useBottomSheetScrollableCreator();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    submitOrder,
    submitting,
    error,
    onItemAdded,
  } = useOrder();

  const { jellyStyle, bgStyle, triggerJelly, triggerBgColor } = useCartAnimation();
  const [note, setNote] = useState("");

  // 注册回调，当菜品添加时触发药丸动画
  useEffect(() => {
    onItemAdded(() => {
      triggerJelly();
    });
  }, [onItemAdded]);

  // 监听 items 变化，触发背景色动画
  useEffect(() => {
    triggerBgColor(items.length > 0);
  }, [items]);

  const handleSubmit = async () => {
    if (items.length === 0) {
      Alert.alert("提示", "请先选择菜品");
      return;
    }

    const success = await submitOrder(note);
    if (success) {
      Alert.alert("成功", "订单已提交！");
      setNote("");
      bottomSheetRef.current?.close();
    } else {
      Alert.alert("错误", error || "提交订单失败");
    }
  };

  const handleClearCart = () => {
    if (items.length === 0) return;
    Alert.alert("确认清空", "确定要清空购物车吗？", [
      { text: "取消", style: "cancel" },
      { text: "清空", style: "destructive", onPress: clearCart },
    ]);
  };

  return (
    <>
      <Animated.View
        style={[
          bgStyle,
          jellyStyle,
        ]}
        className="absolute bottom-[36] left-1/2 -translate-x-1/2 flex-row gap-[5] rounded-full p-2"
      >
        <PressableScale
          onPress={() => {
            bottomSheetRef?.current?.snapToIndex(0);
          }}
          className="flex-row items-center gap-[5]"
        >
          <Image
            source={boyAvatar}
            style={{
              height: 20,
              width: 20,
              borderRadius: 100,
            }}
          />
          <Text className={items.length > 0 ? "text-white" : "text-[#6b7280]"}>
            {totalItems > 0 ? `已选 ${totalItems} 道菜` : "正在等你选菜"}
          </Text>
        </PressableScale>
      </Animated.View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={[400]}
        handleComponent={null}
        enablePanDownToClose={true}
        maxDynamicContentSize={400}
      >
        <LegendList
          showsVerticalScrollIndicator={false}
          data={items}
          ListHeaderComponent={() => (
            <View className="mb-[15] border-b border-['#D8D8D8'] p-[20]">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-[20]">
                  <Image
                    source={boyAvatar}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 100,
                    }}
                  />
                  <Text className="text-lg text-['#6B7280']">
                    准备做{totalItems}道菜
                  </Text>
                </View>
                <View className="flex-row items-center gap-3">
                  <Text className="text-lg font-bold text-['#F59E0B']">
                    ¥{totalPrice}
                  </Text>
                  {items.length > 0 && (
                    <TouchableOpacity
                      onPress={handleClearCart}
                      className="rounded-full bg-gray-100 px-3 py-1"
                    >
                      <Text className="text-xs text-gray-500">清空</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="items-center py-10">
              <Text className="text-gray-400">还没有选择菜品</Text>
            </View>
          )}
          ListFooterComponent={() =>
            items.length > 0 ? (
              <View className="mx-5 my-3 gap-3">
                {/* 备注输入框 */}
                <View className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <Text className="mb-1 text-sm text-gray-500">备注</Text>
                  <TextInput
                    value={note}
                    onChangeText={setNote}
                    placeholder="有什么特殊要求？（可选）"
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={2}
                    className="min-h-[40] text-base"
                  />
                </View>

                {/* 提交按钮 */}
                <TouchableOpacity
                  className="rounded-lg bg-['#F59E0B'] p-3"
                  onPress={handleSubmit}
                  disabled={submitting}
                >
                  <Text className="text-center text-lg font-bold text-white">
                    {submitting ? "提交中..." : `提交订单 · ¥${totalPrice}`}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
          renderItem={({ item }: { item: CartItem }) => (
            <View className="flex-row items-center gap-3 px-5 py-2">
              {/* 菜品图片 */}
              <Image
                source={item.image ? { uri: item.image } : undefined}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: "#F3F4F6",
                }}
                contentFit="cover"
              />

              {/* 菜品信息 */}
              <View className="flex-1">
                <Text className="text-base">{item.name}</Text>
                <Text className="text-sm text-gray-500">
                  ¥{item.price} × {item.quantity} = ¥{item.price * item.quantity}
                </Text>
              </View>

              {/* 数量调整按钮 */}
              <View className="flex-row items-center gap-3">
                <TouchableOpacity
                  className="size-[28] items-center justify-center rounded-full border border-['#F59E0B']"
                  onPress={() => {
                    if (item.quantity <= 1) {
                      removeItem(item.dishId);
                    } else {
                      updateQuantity(item.dishId, item.quantity - 1);
                    }
                  }}
                >
                  <Text className="text-lg leading-tight">-</Text>
                </TouchableOpacity>
                <Text className="min-w-[24] text-center text-lg font-medium">
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  className="size-[28] items-center justify-center rounded-full border border-['#F59E0B']"
                  onPress={() => updateQuantity(item.dishId, item.quantity + 1)}
                >
                  <Text className="text-lg leading-tight">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 10 }}
          style={{ paddingHorizontal: 0 }}
          renderScrollComponent={BottomSheetScrollable}
        />
      </BottomSheet>
    </>
  );
};

interface CartItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}
