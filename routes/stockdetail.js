const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/:code', async(req,res)=>{
  console.log("code받음");
  try{
    const params = req.params;
    console.log("code받음:", params);
    const result = await models.Stock_detail.findOne({
      where:{
        code:params.code
      }
    });
    res.send(result);
  }catch(err){
    console.log(err);
  }
})

module.exports = router;
