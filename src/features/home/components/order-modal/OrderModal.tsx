import BottomSheet, { useBottomSheetScrollableCreator } from "@gorhom/bottom-sheet";
import { LegendList } from "@legendapp/list";
import { Image } from "expo-image";
import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import boyAvatar from "@/assets/images/boy-avatar.jpg";
import { DishItem, DishItemProps, PressableScale } from "@/components";

import { DISHES } from "../../constants";

export const OrderModal = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const BottomSheetScrollable = useBottomSheetScrollableCreator();

  return (
    <>
      <PressableScale
        style={{ transform: [{ translateX: "-50%" }] }}
        className="absolute bottom-[36] left-1/2 flex-row gap-[5] rounded-full bg-[#e2e5eb] p-2"
        onPress={() => {
          bottomSheetRef?.current?.snapToIndex(0);
        }}
      >
        <Image
          source={boyAvatar}
          style={{
            height: 20,
            width: 20,
            borderRadius: 100,
          }}
        />
        <Text className="text-[#6b7280]">正在等你选菜</Text>
      </PressableScale>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={[300]}
        handleComponent={null}
        enablePanDownToClose={true}
        maxDynamicContentSize={300}
      >
        <LegendList
          showsVerticalScrollIndicator={false}
          data={DISHES}
          ListHeaderComponent={() => (
            <View className="mb-[15] flex-row items-center gap-[20] border-b border-['#D8D8D8'] p-[20]">
              <Image
                source={boyAvatar}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 100,
                }}
              />
              <Text className="text-lg text-['#6B7280']">准备做1道菜</Text>
            </View>
          )}
          renderItem={({ item }: { item: DishItemProps }) => (
            <View className="flex-row items-center justify-center">
              <DishItem key={item.id} dish={item}></DishItem>
              <View className="flex-row gap-[6]">
                <TouchableOpacity className="size-[20] items-center justify-center rounded-full border border-['#F59E0B']">
                  <Text className="leading-tight">-</Text>
                </TouchableOpacity>

                <Text>1</Text>

                <TouchableOpacity className="size-[20] items-center justify-center rounded-full border border-['#F59E0B']">
                  <Text className="leading-tight">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 20 }}
          style={{ paddingHorizontal: 20 }}
          renderScrollComponent={BottomSheetScrollable}
        />
      </BottomSheet>
    </>
  );
};
