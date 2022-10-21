const authController = require('../controller/auth');
const express = require('express'); 

/* 로그인 및 인증관련 */
const authRouter = express.Router();
authRouter.get('/', authController.getMain); // 메인 화면
authRouter.get('/login', authController.getLogin); // 로그인 화면
authRouter.get('/login/google', authController.getGoogle); // 구글 passport
authRouter.get('/login/google/callback', authController.getCallback); // passport callback

module.exports = authRouter;