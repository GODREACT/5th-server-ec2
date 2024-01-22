const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', async (req,res)=>{
  try{
    const result = await models.Customer_notice.findAll();
    res.send(result);
  } catch(err) {
    console.log(err);
  }
})
router.get('/:id', async (req,res)=>{
  try{
    const params = req.params;
    const result = await models.Customer_notice.findOne({
      where: {
       id: params.id
      }
    });
    res.send(result);
  } catch(err) {
    console.log(err);
  }
})

router.post('/:id', async (req, res) => {
  const noticeId = req.params.id;
  try {
    const notice = await models.Customer_notice.findByPk(noticeId);
    if (notice) {
      notice.views += 1;
      await notice.save();
      res.status(200).send('노티스OK');
    } else {
      res.status(404).send('Not Found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;