import { Database } from "bun:sqlite";

const db = new Database("love-restaurant.db");

// 检查表结构
console.log("当前 dishes 表结构：");
const tableInfo = db.query("PRAGMA table_info(dishes)").all();
console.log(tableInfo);

// 检查现有数据
console.log("\n现有菜品数据：");
const dishes = db.query("SELECT * FROM dishes").all();
console.log(dishes);

db.close();
