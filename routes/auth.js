const express = require('express');
const models = require('../models');
const axios = require('axios');

const router = express.Router();

const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri = process.env.GOOGLE_REDIRECT_URI;

router.post('/google/data', async (req, res) => {
  const code = req.body.code;
  const url = `https://oauth2.googleapis.com/token`;
  try {
    await axios
      .post(url, {
        code: code,
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        grant_type : "authorization_code"
      },{
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((result) => {
        // console.log(el)
        // return el.data.access_token
        const accessToken = result.data.access_token;
        axios
          .get(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json`, {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
          })
          .then((user) => {
            console.log(user.data.email);
            models.User
              .findAll({
                where : {
                  email : user.data.email
                }
              })
              .then((result) => {
                if(result) {
                  res.send('0');
                } else {
                  res.send('1');
                }
              })
              .catch((err) => {
                console.log(err);
              })
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      })
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;