const express = require('express');
const router = express.Router();
const UserDataModel = require('../model/userdata');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/main', async function (req, res, next) {
  try {
    // MongoDB에서 저장된 데이터를 찾아와서 main 페이지에 전달
    const userdata = await UserDataModel.find({});
    res.render('main', { userdata: userdata });
  } catch (err) {
    console.error(err);
    res.json({ message: "error" });
  }
});

router.post('/main', async (req, res, next) => {
  const { nickname, password } = req.body;
  const userdata = new UserDataModel({
    nickname: nickname,
    password: password
  });

  try {
    const result = await userdata.save();
    console.log(result);
    // 데이터 저장 후 메인 페이지로 리다이렉트
    res.redirect('/main');
  } catch (error) {
    console.error(error);
    res.json({ message: 'error' });
  }
});

module.exports = router;