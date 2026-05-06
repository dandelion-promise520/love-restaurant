# love-restaurant — 情侣点餐 App

## 项目概述
React Native (Expo) 移动应用，情侣之间用来浏览菜品、点餐、查看订单。

## 技术栈
- **Expo SDK 55** + React Native 0.83 + TypeScript (strict)
- **NativeWind v5 preview** (Tailwind CSS for RN)
- **React Navigation v7** (Material Top Tabs, bottom tab bar)
- **Bun** 包管理器
- **oxlint** / **oxfmt** 代码规范
- **@gorhom/bottom-sheet** 底部弹窗
- **@legendapp/list** 高性能列表
- **expo-image** / **expo-haptics** 等 Expo 模块

## 关键命令
```bash
bun install          # 安装依赖
bun start            # 启动 Expo 开发服务器
bun check            # fmt + lint:fix + spellcheck
bun fmt              # 格式化
bun lint / bun lint:fix  # lint 检查/修复
```

## 路径别名
`@/` → `./src/`（babel + tsconfig 已配置）

## 项目结构
- `src/features/` — 功能模块（home/kitchen/orders/couple）
- `src/components/` — 通用组件（ThemedView, ThemedText, DishItem, PressableScale）
- `src/constants/theme.ts` — 颜色主题
- `src/layouts/TabsLayout.tsx` — 底部 Tab 导航

## 代码规范
- 函数组件 + TypeScript，props 类型放 `types.ts`
- 样式用 NativeWind className，主题色用 ThemedView/ThemedText 的 lightColor/darkColor
- 组件文件 PascalCase，hooks kebab-case，常量 UPPER_SNAKE_CASE
- Git commit: conventional commits + emoji (commitizen + cz-git)

## 当前状态
- 首页已开发（菜单分类、菜品列表、点餐弹窗）
- 厨房/订单/情侣页仅占位
- 菜品数据硬编码，无后端
