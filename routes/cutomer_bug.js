const express = require('express');
const models = require('../models');
const axios = require('axios');
const router = express.Router();
const multer = require('multer');
const Customer_bug = models.Customer_bug;
const storage = multer.diskStorage({
  destination:(req, file, callback)=>{
    callback(null,'./images/');
  },
  filename:(req, file,callback)=>{
    callback(null, file.originalname);
  }
})

const upload = multer({storage:storage});

router.post('/', upload.single('imageFile'), (req, res) => {
  console.log("--------------------");
  if (req.file) {
    console.log("이미지파일스", req.file);  
    console.log("서버이미지받음");

    const path = 'http://localhost:3001/images/' + req.file.originalname;

    res.status(200).send({ image_path: path });
    console.log("path경로:", path);
  } else {
    res.status(400).send({ error: '파일이 전송되지 않았거나 업로드에 실패했습니다.' });
  }
});

router.post('/resend', async(req,res)=>{
  try{
    console.log("재송신받음");
    const{ title, content, img_url} = req.body;
    const newBug = await Customer_bug.create({
      title:title,
      content:content,
      img_url:img_url
    });
    console.log(newBug);
    res.send('DB 추가 성공');
  } catch (err) {
    console.error(err);
    res.status(500).send('DB 추가 실패');
  }
})
module.exports = router;
