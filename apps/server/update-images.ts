import { Database } from "bun:sqlite";

const db = new Database("love-restaurant.db");

const updates = [
  ["薄荷炸排骨", "/public/images/bohe.jpg"],
  ["炒花甲", "/public/images/huajia.jpg"],
  ["五花肉", "/public/images/wuhuarou.jpg"],
  ["宫保鸡丁", "/public/images/gongbao.jpg"],
  ["麻婆豆腐", "/public/images/mapo.jpg"],
  ["清蒸鲈鱼", "/public/images/luyu.jpg"],
  ["番茄炒蛋", "/public/images/fanqie.jpg"],
  ["蛋炒饭", "/public/images/danchao.jpg"],
  ["提拉米苏", "/public/images/tiramisu.jpg"],
  ["珍珠奶茶", "/public/images/boba.jpg"],
];

const stmt = db.prepare("UPDATE dishes SET image = ? WHERE name = ?");

for (const [name, image] of updates) {
  const result = stmt.run(image, name);
  console.log(`${result.changes > 0 ? "✅" : "❌"} ${name} -> ${image}`);
}

console.log("\n验证：");
const dishes = db.query("SELECT name, image FROM dishes").all();
dishes.forEach((d) => console.log(`  ${d.name}: ${d.image}`));

db.close();
