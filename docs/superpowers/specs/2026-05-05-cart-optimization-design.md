# 购物车功能优化设计文档

**日期：** 2026-05-05
**状态：** 已批准
**作者：** 小朱 & 小刘 点餐 App 团队

---

## 概述

优化情侣点餐 App 的购物车功能，增加持久化存储和菜品图片显示，提升用户体验。

## 目标

1. **持久化存储** - 关掉 App 后购物车数据不丢失
2. **菜品图片** - 购物车中显示菜品缩略图

---

## 技术方案

### 功能 A: 持久化存储

**技术选型：** AsyncStorage

**理由：**

- React Native 生态标准方案
- 无需额外依赖
- 购物车数据量小（最多几十个菜品），性能完全够用
- API 简单，维护成本低

**数据结构：**

```typescript
interface CartStorage {
  items: CartItem[];
  updatedAt: string; // ISO 8601 时间戳
}
```

**实现要点：**

1. 在 `OrderProvider` 中添加 `useEffect` 监听 `items` 变化
2. 每次 items 更新时，异步保存到 AsyncStorage
3. App 启动时（组件 mount），从 AsyncStorage 加载并恢复购物车
4. 保存失败静默处理，不影响用户体验
5. 使用 `@react-native-async-storage/async-storage` 包

**存储 key：** `love-restaurant-cart`

---

### 功能 B: 菜品图片显示

**技术选型：** expo-image

**理由：**

- 已在项目中使用
- 支持缓存、placeholder、error 状态
- 性能优秀

**UI 规格：**

- 图片尺寸：48x48 像素
- 圆角：8px
- 位置：菜品名称左侧
- Placeholder：灰色背景 + 加载图标
- Error：默认菜品图标

**实现要点：**

1. 修改 `OrderModal.tsx` 的 `renderItem` 函数
2. 在菜品信息左侧添加 Image 组件
3. 使用 `item.image` 作为图片源
4. 如果 `item.image` 为空，显示默认图标

---

## 依赖变更

### 新增依赖

- `@react-native-async-storage/async-storage` - 持久化存储

### 无删除依赖

---

## 文件变更

### 修改文件

1. **`apps/app/src/contexts/order-context.tsx`**
   - 添加 AsyncStorage 读写逻辑
   - 添加 useEffect 监听 items 变化
   - 添加初始化加载逻辑

2. **`apps/app/src/features/home/components/order-modal/OrderModal.tsx`**
   - 修改 renderItem，添加菜品图片
   - 添加图片样式和 placeholder

### 可能新增文件

- `apps/app/src/constants/storage-keys.ts` - 存储 key 常量（可选）

---

## 测试计划

### 手动测试

1. ✅ 添加菜品到购物车
2. ✅ 关闭 App
3. ✅ 重新打开 App，验证购物车数据恢复
4. ✅ 验证菜品图片正确显示
5. ✅ 验证没有图片的菜品显示默认图标

---

## 风险与缓解

| 风险                  | 影响       | 缓解措施                       |
| --------------------- | ---------- | ------------------------------ |
| AsyncStorage 读取失败 | 购物车为空 | 静默处理，不影响使用           |
| 图片 URL 无效         | 图片不显示 | 使用 placeholder 和 error 状态 |
| 图片加载慢            | 体验差     | expo-image 自带缓存机制        |

---

## 里程碑

1. **安装依赖** - 5 分钟
2. **实现持久化存储** - 20 分钟
3. **实现菜品图片** - 15 分钟
4. **测试验证** - 10 分钟

**预计总时间：** 50 分钟

---

## 待办事项

- [ ] 安装 `@react-native-async-storage/async-storage`
- [ ] 修改 `order-context.tsx` 添加持久化逻辑
- [ ] 修改 `OrderModal.tsx` 添加菜品图片
- [ ] 本地测试验证
- [ ] 部署到服务器

---

## 审批

**用户审批：** ✅ 已批准
**日期：** 2026-05-05
