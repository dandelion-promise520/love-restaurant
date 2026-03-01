import BottomSheet, { useBottomSheetScrollableCreator } from "@gorhom/bottom-sheet";
import { LegendList } from "@legendapp/list";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import boyAvatar from "@/assets/images/boy-avatar.jpg";
import { DishItem } from "@/components";

import { DISHES } from "../../constants";

export const OrderModal = () => {
  const BottomSheetScrollable = useBottomSheetScrollableCreator();

  return (
    <>
      <View className="absolute bottom-[36] left-1/2 -translate-x-1/2 flex-row gap-[5] rounded-full bg-[#e2e5eb] p-2">
        <Image
          source={boyAvatar}
          style={{
            height: 20,
            width: 20,
            borderRadius: 100,
          }}
        />
        <Text className="text-[#6b7280]">正在等你选菜</Text>
      </View>

      <BottomSheet>
        <LegendList
          data={DISHES}
          renderItem={() => DISHES.map((item) => <DishItem key={item.id} dish={item}></DishItem>)}
          renderScrollComponent={BottomSheetScrollable}
        />
      </BottomSheet>
    </>
  );
};
