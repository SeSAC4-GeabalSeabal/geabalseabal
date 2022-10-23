const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    Credential: true,
  },
});
const passport = require("passport");

/* cors */
const cors = require("cors");
const corsQptions = {
  origin: "http://localhost:3000",
  Credential: true,
};
app.use(cors(corsQptions));

/* bodyParser */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Sequelize */
const { sequelize } = require("./model");

/* session */
const session = require("express-session");
app.use(session({ secret: "secret" }));
app.use(passport.initialize());
app.use(passport.session());

/* env */
require("dotenv").config();

/* view(test) */
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

/* 로그인&인증 경로 */
const authRouter = require("./routes");
app.use("/", authRouter);

/* socket.io */
io.on("connection", (socket) => {
  socket.on("join_room", (roomName) => {
    console.log(roomName);
    socket.join(roomName); // 방 생성
    socket.to(roomName).emit("welcome");
  });
  // ------------------------------------------------------------------------채팅방 메세지. 오류있음!
  socket.on("send message", (item) => {
    //send message 이벤트 발생
    console.log(item.name + " : " + item.message);
    io.emit("receive message", { name: item.name, message: item.message });
  });
  //클라이언트에 이벤트를 보냄
});
// -------------------------------------------------------------------------

/* sever listen */
sequelize
  .sync()
  // sync -> 모델을 데이터베이스로 동기화해 해당하는 테이블을 생성하고 관계가 있다면 관계도 생성
  // .sync({ force: true })
  // force: ture -> DB 변경사항 덮어씌울건지 -> 새로만들어져서 데이터 초기화
  .then((result) => {
    // console.log(result);  // Sequelize 객체 출력
    http.listen(8000, () => {
      console.log("Server start!s");
    });
  })
  .catch((err) => {
    console.log(err);
  });
