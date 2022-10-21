const express = require('express');
const app = express(); 
const passport = require('passport');

/* cors */
const cors = require('cors');
const corsQptions = {
  origin: 'http://localhost:3000', 
  Credential:true,
}
app.use(cors(corsQptions));

/* bodyParser */
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

/* Sequelize */
const { sequelize } = require('./model');

/* session */
const session = require('express-session');
app.use(session({ secret: 'secret' }));
app.use(passport.initialize()); 
app.use(passport.session());

/* env */
require('dotenv').config(); 

/* view(test) */
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

/* 로그인&인증 경로 */
const authRouter = require('./routes');
app.use('/', authRouter);

/* sever listen */
sequelize
  .sync()
  // sync -> 모델을 데이터베이스로 동기화해 해당하는 테이블을 생성하고 관계가 있다면 관계도 생성
  // .sync({ force: true })
  // force: ture -> DB 변경사항 덮어씌울건지 -> 새로만들어져서 데이터 초기화
  .then(result => {
      // console.log(result);  // Sequelize 객체 출력
      app.listen(8000, () => {
          console.log('Server start!s');
      });
  })
  .catch(err => {
      console.log(err);
  });