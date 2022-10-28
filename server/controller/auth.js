/* 메인 페이지 */
exports.getMain = (req, res) => {
  console.log("session", req.session); // 패스포트 세션
  console.log("req.user", req.user); // 요렇게 써도 사용가능
  if (!req.session) res.send({ isLogin: false });
  else res.send({ isLogin: true });
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
exports.getCallback = passport.authenticate("google", {
  successRedirect: "http://localhost:3000",
  failureRedirect: "http://localhost:3000/login", // 로그인 실패시
});

/* 카카오 로그인 */
exports.getKakao = passport.authenticate("kakao", {
  scope: ["profile_nickname", "account_email"],
});
(exports.getKakaoCallback = passport.authenticate("kakao", {
  successRedirect: "http://localhost:3000",
  failureRedirect: "http://localhost:3000/login", // 로그인 실패시
  failureFlash: true,
})),
  (req, res) => {
    res.redirect("/");
  };

/* 로그아웃 */
exports.logout = async (req, res) => {
  console.log("logout");
  try {
    await req.session.destroy();
    return res.send({ isLogin: false });
  } catch (e) {
    console.log(e);
    return res.send({ isLogin: true });
  }
};
