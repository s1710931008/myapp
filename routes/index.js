var express = require('express');
var router = express.Router();

//導入文件上傳套件
const fs = require('fs')
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('list');
});

/* GET home page. */
router.get('/create', function(req, res, next) {
  res.render('create');
});

/* GET home page. */
router.post('/create', function(req, res, next) {
  res.render('create');
});

//顯示網頁
router.get('/portrait',(req,res)=>{
  res.render('portrait')
})

//處理文件上傳
//文件上傳
router.post('/portrait',(req, res, next)=>{
  const form = formidable({ 
    multiples: true,
    // 設置檔案位置
    uploadDir: __dirname +'/../public/images',
    keepExtensions: true
  });

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

    // Rename the file
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

module.exports = router;
