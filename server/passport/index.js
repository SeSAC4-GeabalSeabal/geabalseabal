const passport = require("passport");
const google = require("./googleStrategy");
const kakao = require("./kakaoStrategy");
const Model = require("../model");

// login이 최초로 성공했을 때만 호출되는 함수
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// 사용자가 페이지를 방문할 때마다 호출되는 함수
passport.deserializeUser(async function (id, done) {
  const user = await Model.User.findOne({
    where: { user_id: id },
  });
  done(null, user);
});

passport.use(google);
passport.use(kakao);

module.exports = passport;
