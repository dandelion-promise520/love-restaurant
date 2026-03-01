import { DishItemProps } from "@/components";

import { MenuItem } from "../components";

export const DISHES: DishItemProps[] = [
  {
    id: "1",
    name: "薄荷炸排骨",
    image: "https://lsky.ljflovezxm.cn/i/2026/02/28/69a2ad03b395b.png",
    tag: [
      {
        name: "营养均衡",
      },
    ],
    description: "爆好吃，好吃炸了",
  },
  {
    id: "2",
    name: "炒花甲",
    image: "https://lsky.ljflovezxm.cn/i/2026/02/28/69a2ad03682df.png",
    tag: [
      {
        name: "营养均衡",
      },
      {
        name: "拿手好菜",
        color: "#f9a03f",
      },
    ],
    description: "测试用一下",
  },
  {
    id: "3",
    name: "五花肉",
    image: "https://lsky.ljflovezxm.cn/i/2026/02/28/69a2ad0398229.png",
  },
  {
    id: "4",
    name: "还没想好",
  },
  {
    id: "5",
    name: "还没想好",
  },
  {
    id: "6",
    name: "还没想好",
  },
  {
    id: "7",
    name: "还没想好",
  },
];

export const CATEGORY: MenuItem[] = [
  { id: "1", title: "宝宝最爱" },
  { id: "2", title: "家常菜" },
  { id: "3", title: "川菜" },
  { id: "4", title: "粤菜" },
  { id: "5", title: "甜品" },
  { id: "6", title: "面食" },
  { id: "7", title: "汤羹" },
  { id: "8", title: "素菜" },
  { id: "9", title: "肉菜" },
  { id: "10", title: "快手菜" },
  { id: "11", title: "减脂菜" },
  { id: "12", title: "儿童餐" },
];
