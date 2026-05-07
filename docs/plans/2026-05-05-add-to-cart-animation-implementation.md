# 点餐动画效果实现计划

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** 为情侣点餐 App 添加点餐交互动画（爱心弹跳、药丸抖动、背景色变化）

**Architecture:** 使用 React Native Reanimated 实现物理动画，通过 AnimatedHeart 组件和 useCartAnimation hook 管理动画状态

**Tech Stack:** React Native, Expo, React Native Reanimated

---

## Task 1: 安装 React Native Reanimated

**Objective:** 安装动画库依赖

**Files:**

- Modify: `apps/app/package.json`
- Modify: `apps/app/babel.config.js`

**Step 1: 安装依赖**

```bash
cd /opt/data/love-restaurant/apps/app
npx expo install react-native-reanimated
```

**Step 2: 配置 Babel**

修改 `apps/app/babel.config.js`，添加 reanimated 插件：

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"], // 添加这行
  };
};
```

**Step 3: 验证安装**

```bash
grep "react-native-reanimated" package.json
```

Expected: `"react-native-reanimated": "^x.x.x"`

---

## Task 2: 创建 useCartAnimation Hook

**Objective:** 封装药丸动画逻辑

**Files:**

- Create: `apps/app/src/hooks/use-cart-animation.ts`

**Step 1: 创建 hook**

```typescript
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from "react-native-reanimated";

export function useCartAnimation() {
  const jellyX = useSharedValue(0);
  const bgColor = useSharedValue("#e2e5eb");

  // 果冻抖动动画
  const triggerJelly = () => {
    jellyX.value = withSequence(
      withSpring(-10, { damping: 2, stiffness: 200 }),
      withSpring(10, { damping: 2, stiffness: 200 }),
      withSpring(-5, { damping: 2, stiffness: 200 }),
      withSpring(0, { damping: 2, stiffness: 200 }),
    );
  };

  // 背景色变化
  const triggerBgColor = (hasItems: boolean) => {
    bgColor.value = withTiming(hasItems ? "#F59E0B" : "#e2e5eb", {
      duration: 300,
    });
  };

  // 药丸样式
  const jellyStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: jellyX.value }],
  }));

  // 背景色样式
  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: bgColor.value,
  }));

  return {
    jellyStyle,
    bgStyle,
    triggerJelly,
    triggerBgColor,
  };
}
```

**Step 2: 验证文件创建**

```bash
cat apps/app/src/hooks/use-cart-animation.ts
```

Expected: 文件内容正确显示

---

## Task 3: 创建 AnimatedHeart 组件

**Objective:** 实现爱心弹跳飞行动画

**Files:**

- Create: `apps/app/src/components/animated-heart.tsx`

**Step 1: 创建组件**

```typescript
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
  Easing,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
    // 计算移动距离
    const deltaX = targetX - startX;
    const deltaY = targetY - startY;

    // 水平移动（抛物线）
    translateX.value = withTiming(deltaX, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });

    // 垂直移动（弹跳）
    translateY.value = withSequence(
      withTiming(deltaY * 0.3, { duration: 150, easing: Easing.out(Easing.cubic) }),
      withSpring(deltaY * 0.6, { damping: 2, stiffness: 100 }),
      withSpring(deltaY * 0.8, { damping: 2, stiffness: 100 }),
      withSpring(deltaY, { damping: 2, stiffness: 100 })
    );

    // 缩放效果
    scale.value = withSequence(
      withTiming(1.2, { duration: 100 }),
      withTiming(0.8, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    // 动画完成后淡出
    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(onComplete)();
      });
    }, 600);
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
```

**Step 2: 验证文件创建**

```bash
cat apps/app/src/components/animated-heart.tsx
```

Expected: 文件内容正确显示

---

## Task 4: 修改 RecipeList 使用动画

**Objective:** 在点餐按钮点击时触发爱心动画

**Files:**

- Modify: `apps/app/src/features/home/components/recipe-list/RecipeList.tsx`

**Step 1: 添加导入**

在文件顶部添加：

```typescript
import { useRef, useState } from "react";
import { AnimatedHeart } from "@/components/animated-heart";
import { useCartAnimation } from "@/hooks/use-cart-animation";
```

**Step 2: 添加状态和 ref**

在组件内部添加：

```typescript
const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
const heartIdRef = useRef(0);
const pillRef = useRef<View>(null);
```

**Step 3: 修改点餐按钮**

找到 onPress 函数，修改为：

```typescript
onPress={(event) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  // 获取点击位置
  const { pageX, pageY } = event.nativeEvent;

  // 添加爱心到列表
  const newHeart = {
    id: heartIdRef.current++,
    x: pageX,
    y: pageY,
  };
  setHearts((prev) => [...prev, newHeart]);

  // 添加菜品到购物车
  addItem({
    dishId: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
  });
}}
```

**Step 4: 添加爱心动画渲染**

在 FlatList 外部添加：

```typescript
{hearts.map((heart) => (
  <AnimatedHeart
    key={heart.id}
    startX={heart.x}
    startY={heart.y}
    targetX={SCREEN_WIDTH / 2} // 药丸位置
    targetY={SCREEN_HEIGHT - 100} // 药丸位置
    onComplete={() => {
      setHearts((prev) => prev.filter((h) => h.id !== heart.id));
      // 触发药丸抖动
      triggerJelly();
    }}
  />
))}
```

**Step 5: 验证修改**

```bash
grep -n "AnimatedHeart\|hearts\|triggerJelly" apps/app/src/features/home/components/recipe-list/RecipeList.tsx
```

Expected: 显示动画相关代码

---

## Task 5: 修改 OrderModal 使用药丸动画

**Objective:** 添加药丸抖动和背景色变化

**Files:**

- Modify: `apps/app/src/features/home/components/order-modal/OrderModal.tsx`

**Step 1: 添加导入**

在文件顶部添加：

```typescript
import Animated from "react-native-reanimated";
import { useCartAnimation } from "@/hooks/use-cart-animation";
```

**Step 2: 使用 hook**

在组件内部添加：

```typescript
const { jellyStyle, bgStyle, triggerJelly, triggerBgColor } = useCartAnimation();
```

**Step 3: 添加 useEffect 监听 items 变化**

```typescript
useEffect(() => {
  triggerBgColor(items.length > 0);
}, [items]);
```

**Step 4: 修改底部栏样式**

找到底部栏组件，修改为：

```typescript
<Animated.View
  style={[bgStyle, jellyStyle]}
  className="absolute bottom-[36] left-1/2 flex-row gap-[5] rounded-full p-2"
>
  {/* 原有内容 */}
</Animated.View>
```

**Step 5: 验证修改**

```bash
grep -n "Animated\|useCartAnimation\|jellyStyle\|bgStyle" apps/app/src/features/home/components/order-modal/OrderModal.tsx
```

Expected: 显示动画相关代码

---

## Task 6: 构建并测试

**Objective:** 构建前端并验证动画效果

**Files:**

- None

**Step 1: 清理 Metro 缓存**

```bash
cd /opt/data/love-restaurant/apps/app
npx expo start --clear
```

**Step 2: 构建 Web 版本**

```bash
npx expo export --platform web
```

Expected: `Exported: dist`

**Step 3: 部署到服务器**

```bash
ssh host "rm -rf /opt/1panel/www/sites/love-restaurant/index/*"
scp -r dist/* host:/opt/1panel/www/sites/love-restaurant/index/
```

**Step 4: 验证部署**

```bash
curl -s http://118.31.48.200:8080/ | head -5
```

Expected: HTML 内容

---

## Task 7: 手动测试验证

**Objective:** 验证所有动画效果正常工作

**测试步骤：**

1. **测试爱心弹跳飞行**
   - 打开 http://118.31.48.200:8080/
   - 点击菜品旁边的 ❤️ 按钮
   - 确认爱心从按钮位置弹跳飞向底部药丸

2. **测试药丸果冻抖动**
   - 爱心到达药丸后
   - 确认药丸左右摇晃（果冻效果）

3. **测试背景色变化**
   - 添加菜品后，确认药丸背景变为橙色
   - 清空购物车，确认药丸背景恢复灰色

4. **测试连续点餐**
   - 连续点击多个菜品
   - 确认动画正常叠加，无卡顿

---

## 验收标准

- [ ] 点击爱心按钮，爱心弹跳飞向药丸
- [ ] 爱心到达药丸时，药丸果冻抖动
- [ ] 有菜时药丸背景变为橙色
- [ ] 清空购物车时药丸背景恢复灰色
- [ ] 动画流畅，无卡顿
- [ ] 所有现有功能不受影响

---

## 完成

实现完成后，更新设计文档状态为"已实现"。

```bash
# 标记完成
echo "✅ 点餐动画效果已实现"
```
