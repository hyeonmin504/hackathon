const express = require('express');
const router = express.Router();
const UserDataModel = require('../model/userdata');
const ListInfoModel = require('../model/listinfo');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/write', (req, res, next) => {
  const nickname = req.session.nickname;
  res.render('write', { nickname, buttonNumber: req.query.buttonNumber });
});

// routes/index.js

router.get('/subjectList', async (req, res, next) => {
  const nickname = req.session.nickname;
  const buttonNumber = req.query.buttonNumber;
  const content = req.query.content;
  try {
    // MongoDB에서 해당 버튼에 대한 데이터를 검색
    const listInfo = await ListInfoModel.find({ buttonNumber });

    res.render('subjectList', { nickname, buttonNumber: req.query.buttonNumber ,content, listInfo });
  } catch (err) {
    console.error(err);
    res.json({ message: 'error' });
  }
});


router.get('/main', async function (req, res, next) {
  try {
    // MongoDB에서 저장된 데이터를 찾아와서 main 페이지에 전달
    const userdata = await UserDataModel.find({});
    res.render('main', { userdata });
  } catch (err) {
    console.error(err);
    res.json({ message: "error" });
  }
});

router.post('/post', async (req, res, next) => {
  const { title, content, nickname, buttonNumber } = req.body;

  // MongoDB에 게시글 정보 저장
  const postData = new ListInfoModel({
    title,
    content,
    nickname,
    buttonNumber,
  });

  try {
    const result = await postData.save();
    console.log(result);
    res.redirect('/'); // 게시글 저장 후 메인 페이지로 리다이렉트
  } catch (error) {
    console.error(error);
    res.json({ message: 'error' });
  }
});

router.post('/main', async (req, res, next) => {
  const { nickname, password } = req.body;
  const userdata = new UserDataModel({
    nickname,
    password
  });

  try {
    const result = await userdata.save();
    console.log(result);
    // 세션에 닉네임 저장
    req.session.nickname = nickname;
    res.redirect('/main');
  } catch (error) {
    console.error(error);
    res.json({ message: 'error' });
  }
});

module.exports = router;