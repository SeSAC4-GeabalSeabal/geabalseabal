const authController = require("../controller/auth");
const express = require("express");

/* 로그인 및 인증관련 */
const authRouter = express.Router();
authRouter.get("/", authController.getMain); // 메인 화면
authRouter.get("/login", authController.getLogin); // 로그인 화면
authRouter.post("/logout", authController.logout); // 로그아웃 기능

/* 구글 passport */
authRouter.get("/login/google", authController.getGoogle); // passport
authRouter.get("/login/google/callback", authController.getCallback); // callback
/* 카카오 passport*/
authRouter.get("/login/kakao", authController.getKakao); // passport
authRouter.get("/login/kakao/callback", authController.getKakaoCallback); // callback

module.exports = authRouter;
