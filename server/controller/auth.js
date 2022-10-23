/* 메인 페이지 */
exports.getMain = (req, res) => {
  console.log(req.session); // 패스포트 세션
  console.log(req.user); // 요렇게 써도 사용가능
  res.send("메롱");
};

/* 로그인 페이지 */
exports.getLogin = (req, res) => {
  console.log(req.session); // 패스포트 세션
  console.log(req.user);
  res.render("login");
};

/* passport */
const passport = require("../passport/index.js");

/* 패스포트 로그인 기능 */
/* 구글 로그인 */
exports.getGoogle = passport.authenticate("google", {
  scope: ["email", "profile"],
});
(exports.getCallback = passport.authenticate("google", {
  successRedirect: "http://localhost:3000",
  failureRedirect: "http://localhost:8000/login", // 로그인 실패시
})),
  (req, res) => {
    res.redirect("/");
  };

/* 카카오 로그인 */
exports.getKakao = passport.authenticate("kakao", {
  scope: ["profile_nickname", "account_email"],
});
(exports.getKakaoCallback = passport.authenticate("kakao", {
  successRedirect: "http://localhost:3000",
  failureRedirect: "http://localhost:8000/login", // 로그인 실패시
})),
  (req, res) => {
    res.redirect("/");
  };

exports.getLogout = (req, res) => {
  res.redirect(
    "https://kauth.kakao.com/oauth/authorize?client_id=6ea89a356badf22e749b5a73c47cf51e&redirect_uri=http://localhost:8000/login/kakao/callback&response_type=code"
  );
};
