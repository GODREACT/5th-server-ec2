const express = require('express');
const models = require('../models');
const router = express.Router();
const multer = require('multer');

// 이미지 경로 설정
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images')
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({storage: storage});

// 이미지 받고 경로 보내주기
router.post('/images', upload.single('img_url'), (req,res) => {
  console.log(req.file);
  const path = 'http://localhost:3001/images/' + req.file.originalname;
  res.status(200).send({'path' : path});
});

// 이미지 여러개 받을때


router.use('/images', express.static('images'));

// 예시
router.get('/', async(req, res) => {
  try {
    await models.Html.findAll()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
  } catch(err) {
    // console.log(err);
  }
});

router.post('/', (req, res) => {
  try {
    const reqBody = req.body;
    const result = models.Html.create(reqBody);
    console.log(result);
    res.status(201).end();
  } catch(err) {
    console.log(err);
    res.status(500);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await models.Html.destroy({where : {id : id}});
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
    await models.Html.update({
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
// 조회수
router.patch('/increase-views/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // 쿠키에서 조회수 체크용 쿠키를 가져옵니다.
    const viewedCookie = req.cookies['htmlViewed_' + id];
    console.log(viewedCookie);

    // 만약 쿠키가 없다면 조회수를 증가시키고 쿠키를 설정합니다.
    if (!viewedCookie) {
      // 데이터베이스에서 해당 id의 데이터를 찾습니다.
      const htmlData = await models.Html.findByPk(id);
      if (!htmlData) {
        return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
      }

      // 조회수를 1 증가시킵니다.
      htmlData.views += 1;

      // 변경된 조회수를 저장합니다.
      await htmlData.save();

      const expires = new Date();
      expires.setDate(expires.getDate() + 1);

      res.cookie('htmlViewd_' + id, '1', {
        expires: expires
      })

      // 쿠키를 설정하여 중복 조회를 방지합니다.
      // res.setHeader('Set-Cookie', `htmlViewed_${id}=true; Max-Age=${24 * 60 * 60}; Path=/`);
      // res.json({ message: '조회수가 증가되었습니다.' });
      console.log('실행됨');
      res.sendStatus(202)
    } else {
      // 이미 조회한 경우에는 중복 조회로 간주합니다.
      res.json({ message: '이미 조회한 게시물입니다.' });
    }
  } catch (error) {
    console.error('Error increasing views:', error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 여기까지가 조회수

module.exports = router;