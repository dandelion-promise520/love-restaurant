# 点餐动画效果设计文档

**日期：** 2026-05-05
**状态：** 已批准
**作者：** 小朱 & 小刘 点餐 App 团队

---

## 概述

为情侣点餐 App 添加点餐交互动画，提升用户体验。包含三个动画效果：

1. 爱心弹跳飞向药丸
2. 药丸果冻抖动
3. 药丸背景色变化

## 目标

- 让点餐过程更有趣、更生动
- 提供即时的视觉反馈
- 增强用户参与感

---

## 技术方案

### 技术选型：React Native Reanimated

**理由：**

- 性能最佳，60fps 流畅动画
- 支持复杂物理动画（弹跳、弹簧）
- Expo 官方支持
- 社区活跃，文档完善

**依赖：**

```bash
npx expo install react-native-reanimated
```

---

## 动画设计

### 动画 1: 爱心弹跳飞向药丸

**效果描述：**

- 爱心从菜品按钮位置飞向底部药丸
- 飞行轨迹为抛物线
- 到达药丸时弹跳 2-3 次，高度逐渐减小

**动画参数：**

```typescript
// 水平移动（抛物线）
const translateX = withTiming(targetX, {
  duration: 500,
  easing: Easing.out(Easing.cubic),
});

// 垂直移动（弹跳）
const translateY = withSequence(
  withSpring(-30, { damping: 2, stiffness: 100 }),
  withSpring(0, { damping: 2, stiffness: 100 }),
  withSpring(-15, { damping: 2, stiffness: 100 }),
  withSpring(0, { damping: 2, stiffness: 100 }),
);
```

**时长：** 500ms

---

### 动画 2: 药丸果冻抖动

**效果描述：**

- 爱心到达药丸后，药丸左右摇晃
- 像果冻一样 Q 弹
- 摇晃幅度逐渐减小

**动画参数：**

```typescript
const jellyAnimation = withSequence(
  withSpring(-10, { damping: 2, stiffness: 200 }),
  withSpring(10, { damping: 2, stiffness: 200 }),
  withSpring(-5, { damping: 2, stiffness: 200 }),
  withSpring(0, { damping: 2, stiffness: 200 }),
);
```

**时长：** 400ms

---

### 动画 3: 药丸背景色变化

**效果描述：**

- 有菜时药丸背景从灰色渐变为橙色
- 清空购物车时从橙色渐变回灰色
- 过渡平滑自然

**动画参数：**

```typescript
const backgroundColor = withTiming(hasItems ? "#F59E0B" : "#e2e5eb", { duration: 300 });
```

**时长：** 300ms

---

## 整体流程

```
用户点击爱心按钮
    ↓
爱心开始弹跳飞向药丸（500ms）
    ↓
爱心到达药丸，触发药丸果冻抖动（400ms）
    ↓
药丸背景色渐变为黄色（300ms）
    ↓
完成
```

**总时长：** 约 1.2 秒

---

## 文件变更

### 新增文件

- `apps/app/src/components/animated-heart.tsx` - 爱心动画组件
- `apps/app/src/hooks/use-cart-animation.ts` - 购物车动画 hook

### 修改文件

- `apps/app/package.json` - 添加 react-native-reanimated 依赖
- `apps/app/src/features/home/components/recipe-list/RecipeList.tsx` - 使用动画组件
- `apps/app/src/features/home/components/order-modal/OrderModal.tsx` - 添加药丸动画
- `apps/app/babel.config.js` - 添加 reanimated 插件

---

## 组件设计

### AnimatedHeart 组件

**Props：**

```typescript
interface AnimatedHeartProps {
  startX: number; // 起始 X 坐标
  startY: number; // 起始 Y 坐标
  targetX: number; // 目标 X 坐标
  targetY: number; // 目标 Y 坐标
  onComplete: () => void; // 动画完成回调
}
```

**功能：**

- 接收起始和目标坐标
- 执行弹跳飞行动画
- 动画完成后触发回调

---

### useCartAnimation Hook

**返回值：**

```typescript
interface UseCartAnimationReturn {
  jellyStyle: AnimatedStyleType; // 药丸抖动样式
  bgColor: AnimatedStyleType; // 背景色样式
  triggerJelly: () => void; // 触发抖动动画
  triggerBgColor: (hasItems: boolean) => void; // 触发背景色变化
}
```

**功能：**

- 管理药丸动画状态
- 提供触发动画的方法
- 返回动画样式

---

## 样式规范

### 爱心样式

- 大小：24x24
- 颜色：#f08080（粉色）
- 图标：AntDesign heart

### 药丸样式

- 背景色：#e2e5eb（默认）→ #F59E0B（有菜时）
- 圆角：rounded-full
- 内边距：p-2

---

## 性能考虑

### 优化点

- 使用 `useSharedValue` 共享动画值
- 使用 `withSpring` 物理动画，性能更好
- 动画完成后释放资源
- 避免不必要的重渲染

### 内存管理

- 动画组件在动画完成后卸载
- 及时清理动画监听器
- 使用 `cancelAnimation` 停止未完成的动画

---

## 测试计划

### 手动测试

1. ✅ 点击爱心，观察弹跳飞行动画
2. ✅ 爱心到达药丸，观察果冻抖动
3. ✅ 检查药丸背景色变化
4. ✅ 连续点击多个菜品，观察动画叠加
5. ✅ 清空购物车，观察背景色恢复

### 性能测试

- 动画帧率保持 60fps
- 无卡顿、无掉帧
- 内存占用合理

---

## 风险与缓解

| 风险         | 影响         | 缓解措施                   |
| ------------ | ------------ | -------------------------- |
| 动画卡顿     | 体验差       | 使用 Reanimated，性能优化  |
| 坐标计算错误 | 动画位置不对 | 使用 onLayout 获取准确坐标 |
| 动画叠加     | 混乱         | 使用动画队列，依次执行     |

---

## 里程碑

1. **安装依赖** - 5 分钟
2. **配置 Babel** - 5 分钟
3. **实现 AnimatedHeart 组件** - 30 分钟
4. **实现 useCartAnimation hook** - 20 分钟
5. **集成到现有组件** - 20 分钟
6. **测试验证** - 15 分钟

**预计总时间：** 95 分钟

---

## 待办事项

- [ ] 安装 react-native-reanimated
- [ ] 配置 babel.config.js
- [ ] 创建 AnimatedHeart 组件
- [ ] 创建 useCartAnimation hook
- [ ] 修改 RecipeList 使用动画
- [ ] 修改 OrderModal 添加药丸动画
- [ ] 测试验证
- [ ] 部署

---

## 审批

**用户审批：** ✅ 已批准
**日期：** 2026-05-05
