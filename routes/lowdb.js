const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

// 初始化
db.defaults({ posts: [], user: {} }).write()

//寫入數據
// db.get('posts').push({id:2,title:'今天天氣還不錯~~'}).write();

// 插入放置最前數據
// db.get('posts').unshift({id:3,title:'今天天氣還不錯~~'}).write();

// 取數據
// console.log(db.get('posts').value());

//刪除數據
// let res = db.get('posts').remove({id:3}).write();
// console.log(res);

//取得單筆記錄
// let res = db.get('posts').find({id:1}).value();
// console.log(res);

//更新
// let res = db.get('posts').find({id:1}).assign({title:'今天下雨了'}).write();
// console.log(res); 