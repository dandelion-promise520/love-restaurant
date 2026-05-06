import { Database } from "bun:sqlite";

const db = new Database("love-restaurant.db");

// 使用 Pexels 免费图片 URL
const updates = [
  ["薄荷炸排骨", "https://images.pexels.com/photos/6646069/pexels-photo-6646069.jpeg?auto=compress&cs=tinysrgb&w=400"],
  ["炒花甲", "https://images.pexels.com/photos/6646071/pexels-photo-6646071.jpeg?auto=compress&cs=tinysrgb&w=400"],
  ["五花肉", "https://images.pexels.com/photos/6646075/pexels-photo-6646075.jpeg?auto=compress&cs=tinysrgb&w=400"],
  ["宫保鸡丁", "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400"],
  ["麻婆豆腐", "https://images.pexels.com/photos/6646062/pexels-photo-6646062.jpeg?auto=compress&cs=tinysrgb&w=400"],
  ["清蒸鲈鱼", "https://images.pexels.com/photos/6646073/pexels-photo-6646073.jpeg?auto=compress&cs=tinysrgb&w=400"],
  ["番茄炒蛋", "https://images.pexels.com/photos/6646072/pexels-photo-6646072.jpeg?auto=compress&cs=tinysrgb&w=400"],
  ["蛋炒饭", "https://images.pexels.com/photos/6646074/pexels-photo-6646074.jpeg?auto=compress&cs=tinysrgb&w=400"],
  ["提拉米苏", "https://images.pexels.com/photos/6646076/pexels-photo-6646076.jpeg?auto=compress&cs=tinysrgb&w=400"],
  ["珍珠奶茶", "https://images.pexels.com/photos/6646077/pexels-photo-6646077.jpeg?auto=compress&cs=tinysrgb&w=400"],
];

const stmt = db.prepare("UPDATE dishes SET image = ? WHERE name = ?");

for (const [name, image] of updates) {
  const result = stmt.run(image, name);
  console.log(`${result.changes > 0 ? "✅" : "❌"} ${name}`);
}

db.close();
console.log("Done!");
