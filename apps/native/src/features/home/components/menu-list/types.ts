import { StyleProp, ViewStyle } from "react-native";

export type MenuItem = {
  id: string;
  title: string;
};

export type Props = {
  data: MenuItem[];

  selectedId: string;

  onChange: (id: string, index: number) => void;

  width?: number;

  itemHeight?: number;

  style?: StyleProp<ViewStyle>;
};
