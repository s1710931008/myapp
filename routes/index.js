var express = require('express');
var router = express.Router();

//導入文件上傳套件
const fs = require('fs')
var formidable = require('formidable');

//lowdb 導入
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 const adapter = new FileSync(__dirname+'/../data/db.json')
const db = low(adapter)

//導入shortid
const shortid = require('shortid')


/* GET home page. */
router.get('/', function(req, res, next) {
  let accounts = db.get('accounts').value();
  console.log(accounts)
  res.render('list',{accounts});
});

/* get 填寫建立內容 */
router.get('/create', function(req, res, next) {
  res.render('create');
});

/* 建立存檔 */
router.post('/create', function(req, res, next) {
  // db.get('accounts').push(req.body).write();
  let id = shortid.generate();
  console.log(req.body)
  //寫入資料
  db.get('accounts').unshift({id:id, ...req.body}).write();
  res.redirect("/");
});

//顯示網頁
router.get('/portrait',(req,res)=>{
  res.render('portrait')
})

//處理文件上傳
//文件上傳
router.post('/portrait',(req, res, next)=>{
 
  /* 引用檔案上傳模板 */
  const form = formidable({ 
    multiples: true,
    // 設置檔案位置
    uploadDir: __dirname +'/../public/images',
    keepExtensions: true
  });

  /* 檔案上傳 */
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log(fields);
    console.log(files);
    // res.json({ fields, files });
    // let url = '/images/'+files.portrait.newFilename;
    
    let url = '/images/'+files.portrait.originalFilename;

    let id = shortid.generate();
    console.log(req.body)
    //寫入資料
    db.get('accounts').unshift({id:id,url,fields, ...req.body}).write();

    /* 上傳案更改檔案 */
    let NewFile =__dirname +'/../public/images/'+ files.portrait.newFilename;
    let NewOrg =__dirname +'/../public/images/' + files.portrait.originalFilename;
    console.log(NewFile)
    console.log(NewOrg)
    fs.rename(NewFile, NewOrg, (err) => {
      if(err){
        console.log('更名異常')
        return;
      } else {
        console.log('更名成功')
      }
    });

    res.send(url);
  });

})

/* 刪除檔案 */
router.get('/account/:id', function(req, res) {
  //獲取 params id
  let id = req.params.id;
  console.log(id)
  db.get('accounts').remove({id:id}).write();
  res.redirect("/");
});

/* 更新編輯 */
router.get('/edit/:id', function(req, res) {
  //獲取 params id
  let id = req.params.id;
  console.log(id)
  str=db.get('accounts').find({id:id}).value();
  res.render('edit',{str})
});

module.exports = router;
