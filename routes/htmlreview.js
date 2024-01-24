const express = require('express');
const models = require('../models');
const router = express.Router();

// 예시
router.get('/:id', async(req, res) => {
  try {
    const params = req.params
    console.log("받음 -----------------");
    console.log(params.id);
    console.log("-----------------");
    await models.Htmlreview.findAll({
      where:{
        reviewid:params.id
      }
    })
    .then(result => {
      res.send(result);
      console.log('결과',result);
    })
    .catch(err => {
      console.log(err);
    })
  } catch(err) {
    // console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const reqBody = req.body;
    console.log("reqBody: ", reqBody);
    const result = await models.Htmlreview.create(reqBody);
    console.log("post result: ", result);
    res.status(201).end();
  } catch(err) {
    console.log(err);
    res.status(500);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await models.Htmlreview.destroy({where : {id : id}});
    res.send('삭제 성공');
  } catch(err) {
    console.log(err);
  }
})

router.patch('/update/:id', async(req, res) => {
  try {
    // :id, :userid, :key
    const info = req.body;
    console.log("신호");

    console.log(req.body);
    await models.Htmlreview.update({
      title: info.title,
      content: info.content,
      img_url: info.img_url
    },{
      where: {
        id: req.params.id
      }
    })
    .then(result => {
      res.send('업데이트됨');
    })
    .catch(err => {
      console.log(err);
    })
  } catch(err) {
    console.log(err);
  }
})


module.exports = router;