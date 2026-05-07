import { Database } from "bun:sqlite";

const db = new Database("love-restaurant.db", { create: true });

// 启用 WAL 模式提高性能
db.exec("PRAGMA journal_mode = WAL");
db.exec("PRAGMA synchronous = NORMAL");
db.exec("PRAGMA foreign_keys = ON");

// 创建表
db.exec(`
  CREATE TABLE IF NOT EXISTS dishes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    tags TEXT DEFAULT '[]',
    available INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    note TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    dish_id TEXT NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    avatar TEXT,
    partner_id TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// 初始化菜品数据
const dishCount = db.query("SELECT COUNT(*) as count FROM dishes").get() as { count: number };
if (dishCount.count === 0) {
  const insertDish = db.prepare(`
    INSERT INTO dishes (id, name, description, price, category, image, tags, available)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const dishes = [
    [
      "1",
      "薄荷炸排骨",
      "外酥里嫩，薄荷清香",
      48,
      "house-special",
      "https://example.com/pai-gu.jpg",
      '["招牌","必点"]',
      1,
    ],
    [
      "2",
      "炒花甲",
      "鲜美多汁，蒜蓉爆炒",
      38,
      "house-special",
      "https://example.com/hua-jia.jpg",
      '["海鲜","下酒"]',
      1,
    ],
    [
      "3",
      "五花肉",
      "肥而不腻，入口即化",
      42,
      "house-special",
      "https://example.com/wu-hua-rou.jpg",
      '["肉类","经典"]',
      1,
    ],
    [
      "4",
      "宫保鸡丁",
      "经典川菜，麻辣鲜香",
      36,
      "sichuan",
      "https://example.com/gong-bao.jpg",
      '["川菜","经典"]',
      1,
    ],
    [
      "5",
      "麻婆豆腐",
      "麻辣鲜香，下饭神器",
      28,
      "sichuan",
      "https://example.com/mapo.jpg",
      '["川菜","素菜"]',
      1,
    ],
    [
      "6",
      "清蒸鲈鱼",
      "鲜嫩可口，清淡养身",
      58,
      "cantonese",
      "https://example.com/lu-yu.jpg",
      '["粤菜","海鲜"]',
      1,
    ],
    [
      "7",
      "番茄炒蛋",
      "家常美味，宝宝最爱",
      22,
      "baby-favorite",
      "https://example.com/fan-qie.jpg",
      '["家常","宝宝"]',
      1,
    ],
    [
      "8",
      "蛋炒饭",
      "粒粒分明，香气扑鼻",
      18,
      "baby-favorite",
      "https://example.com/dan-chao.jpg",
      '["主食","宝宝"]',
      1,
    ],
    [
      "9",
      "提拉米苏",
      "意式甜品，浓郁丝滑",
      32,
      "dessert",
      "https://example.com/tiramisu.jpg",
      '["甜品","意式"]',
      1,
    ],
    [
      "10",
      "珍珠奶茶",
      "香甜可口，Q弹珍珠",
      15,
      "drink",
      "https://example.com/boba.jpg",
      '["饮品","奶茶"]',
      1,
    ],
  ];

  for (const dish of dishes) {
    insertDish.run(...dish);
  }
}

// 初始化用户数据
const userCount = db.query("SELECT COUNT(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, avatar, partner_id) VALUES (?, ?, ?, ?)
  `);
  insertUser.run("1", "小明", "boy-avatar", "2");
  insertUser.run("2", "小红", "girl-avatar", "1");
}

export default db;
