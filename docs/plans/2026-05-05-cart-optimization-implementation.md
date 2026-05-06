# 购物车优化实现计划

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** 为情侣点餐 App 添加购物车持久化存储和菜品图片显示功能

**Architecture:** 使用 AsyncStorage 实现购物车数据持久化，在 OrderModal 中添加 expo-image 显示菜品图片

**Tech Stack:** React Native, Expo, AsyncStorage, expo-image

---

## Task 1: 安装 AsyncStorage 依赖

**Objective:** 安装持久化存储所需的依赖包

**Files:**
- Modify: `apps/app/package.json`

**Step 1: 安装依赖**

```bash
cd /opt/data/love-restaurant/apps/app
npm install @react-native-async-storage/async-storage
```

**Step 2: 验证安装**

```bash
grep "async-storage" package.json
```

Expected: `"@react-native-async-storage/async-storage": "^x.x.x"`

---

## Task 2: 创建存储工具函数

**Objective:** 封装 AsyncStorage 的读写操作

**Files:**
- Create: `apps/app/src/lib/storage.ts`

**Step 1: 创建存储工具**

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "love-restaurant-cart";

export interface CartStorage {
  items: Array<{
    dishId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  updatedAt: string;
}

export async function saveCart(items: CartStorage["items"]): Promise<void> {
  try {
    const data: CartStorage = {
      items,
      updatedAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to save cart:", error);
  }
}

export async function loadCart(): Promise<CartStorage["items"]> {
  try {
    const json = await AsyncStorage.getItem(CART_KEY);
    if (!json) return [];
    const data: CartStorage = JSON.parse(json);
    return data.items || [];
  } catch (error) {
    console.warn("Failed to load cart:", error);
    return [];
  }
}

export async function clearCartStorage(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (error) {
    console.warn("Failed to clear cart:", error);
  }
}
```

**Step 2: 验证文件创建**

```bash
cat apps/app/src/lib/storage.ts
```

Expected: 文件内容正确显示

---

## Task 3: 修改 OrderContext 添加持久化逻辑

**Objective:** 在购物车状态管理中集成 AsyncStorage

**Files:**
- Modify: `apps/app/src/contexts/order-context.tsx`

**Step 1: 添加导入**

在文件顶部添加：
```typescript
import { saveCart, loadCart, clearCartStorage } from "@/lib/storage";
```

**Step 2: 添加初始化加载**

在 `OrderProvider` 组件中，添加 useEffect 加载购物车：

```typescript
// 初始化时加载购物车
useEffect(() => {
  loadCart().then((savedItems) => {
    if (savedItems.length > 0) {
      setItems(savedItems);
    }
  });
}, []);
```

**Step 3: 添加自动保存**

添加 useEffect 监听 items 变化并保存：

```typescript
// 自动保存购物车
useEffect(() => {
  if (items.length > 0) {
    saveCart(items);
  }
}, [items]);
```

**Step 4: 修改 clearCart 函数**

```typescript
const clearCart = useCallback(() => {
  setItems([]);
  clearCartStorage();
}, []);
```

**Step 5: 验证修改**

```bash
grep -n "saveCart\|loadCart\|clearCartStorage" apps/app/src/contexts/order-context.tsx
```

Expected: 显示所有导入和使用位置

---

## Task 4: 修改 OrderModal 添加菜品图片

**Objective:** 在购物车列表中显示菜品缩略图

**Files:**
- Modify: `apps/app/src/features/home/components/order-modal/OrderModal.tsx`

**Step 1: 修改 renderItem 函数**

找到 `renderItem` 函数，修改为：

```typescript
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
      placeholder={require("@/assets/images/defaultDishImage.png")}
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
            Alert.alert("删除菜品", `确定要删除 ${item.name} 吗？`, [
              { text: "取消", style: "cancel" },
              {
                text: "删除",
                style: "destructive",
                onPress: () => removeItem(item.dishId),
              },
            ]);
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
```

**Step 2: 验证修改**

```bash
grep -n "Image\|48\|borderRadius" apps/app/src/features/home/components/order-modal/OrderModal.tsx
```

Expected: 显示图片相关代码

---

## Task 5: 构建并测试

**Objective:** 构建前端并验证功能

**Files:**
- None

**Step 1: 构建前端**

```bash
cd /opt/data/love-restaurant/apps/app
npx expo export --platform web
```

Expected: `Exported: dist`

**Step 2: 部署到服务器**

```bash
ssh host "rm -rf /opt/1panel/www/sites/love-restaurant/index/*"
scp -r dist/* host:/opt/1panel/www/sites/love-restaurant/index/
```

**Step 3: 验证部署**

```bash
curl -s http://118.31.48.200:8080/ | head -5
```

Expected: HTML 内容

---

## Task 6: 手动测试验证

**Objective:** 验证所有功能正常工作

**测试步骤：**

1. **测试菜品图片显示**
   - 打开 http://118.31.48.200:8080/
   - 添加菜品到购物车
   - 打开购物车，确认显示菜品图片

2. **测试持久化存储**
   - 添加菜品到购物车
   - 刷新页面
   - 确认购物车数据保留

3. **测试清空购物车**
   - 点击"清空"按钮
   - 确认弹出二次确认
   - 确认清空后数据清除

4. **测试备注功能**
   - 输入备注内容
   - 提交订单
   - 确认备注被提交

---

## 验收标准

- [ ] 购物车显示菜品图片（48x48 圆角）
- [ ] 关闭 App 后购物车数据保留
- [ ] 重新打开 App 购物车自动恢复
- [ ] 清空购物车功能正常
- [ ] 备注输入功能正常
- [ ] 所有现有功能不受影响

---

## 完成

实现完成后，更新设计文档状态为"已实现"。

```bash
# 标记完成
echo "✅ 购物车优化功能已实现"
```
