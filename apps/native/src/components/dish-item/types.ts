export interface DishItemProps {
  id: string;
  name: string;
  image?: string;
  tag?: { name: string; color?: string }[];
  description?: string;
}
