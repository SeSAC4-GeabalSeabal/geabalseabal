/* 메인 페이지 */
exports.getMain = (req, res) => {
  res.send('메롱');
};

/* 로그인 페이지 */
exports.getLogin = (req, res) => {
  res.render('login');
};

/* passport */
const passport = require('../passport/index.js'); 

/* 패스포트 로그인 기능 */
exports.getGoogle =  passport.authenticate('google', { scope: ['email', 'profile']});
exports.getCallback = 
  passport.authenticate('google', {
    successRedirect: 'http://localhost:8000', 
    failureRedirect: 'http://localhost:8000/login', // 로그인 실패시
  });