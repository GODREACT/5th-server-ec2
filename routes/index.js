const express = require('express');
const models = require('../models');

const router = express.Router();

// router.post('/success', async (req, res) => {
//   try {
//     const code = req.body.code;
//     const client_id = '1087352918812-0sng7c0ne7imi2npab9fev8vj2ivvg16.apps.googleusercontent.com';
//     const client_secret = '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'
//     const redirect_uri = 'http://localhost:3000/success'
//     const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}$grant_type=authorization_code`
//     console.log(code);

//     const access_token = await axios
//       .post(url, {
//         headers: { "content-type": "application/x-www-form-urlencoded" },
//       })
//       .then((result) => {
//         return result.data.access_token
//       })
//       .catch((err) => {
//         console.log(err);
//       })
    
//     console.log(access_token);
//   } catch(err) {
//     console.log(err);
//   }
// })

module.exports = router;