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
  socket['nickname'] = '익명'; // 기본 닉네임
  socket.on("join_room", (roomName) => {
    console.log(roomName);
    socket.join(roomName); // 방 생성
    // 방 사람들에게만 welocome 이벤트 생성 ! (입장 메세지 보내기)
    socket.to(roomName).emit("welcome", socket.nickname);
  });
  // 채팅방 메세지 ** 룸에만 가도록 new_message와 같이 변경 필요 !!! ** 
  socket.on("send message", (item) => {
    //send message 이벤트 발생
    console.log(item.name + " : " + item.message);
    io.emit("receive message", { name: item.name, message: item.message });
  });
  // 닉네임 받아와서 소켓에 저장
  socket.on('nickname', (nickname) => (socket['nickname'] = nickname));
  // 새로운 채팅방 메세지 받고(Room 버전)
  socket.on('new_message', (msg, room, done) => {
    // 룸안에 있는 사람들에게만 닉네임, 메세지 함께 전달
    socket.to(room).emit('new_message', `${socket.nickname} : ${msg}`);
  })
  // 먼저 들어온 유저의 offer (local)받는 부분
  socket.on('first_offer', (offer, roomName) => {
    // 먼저 들어온 유저의 offer (remote) 보내는 부분(나중에 들어온 유저에게)
    socket.to(roomName).emit('last_offer', offer);
  })
  // 나중 들어온 유저의 answer (local)받는 부분
  socket.on('answer', (answer, roomName) => {
    // 나중 들어온 유저의 answer (remote) 보내는 부분(먼저 들어온 유저에게)
    socket.to(roomName).emit('answer', answer);
  })
  // 연결 끊어지기 직전에 bye 메세지 전송
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => socket.to(room).emit('bye', socket.nickname));
    // socket.romms는 방의 ID를 얻을 수 있음 (set(1) {'id', 'rommName')
  })
});


/* sever listen */
sequelize
  .sync()
  // sync -> 모델을 데이터베이스로 동기화해 해당하는 테이블을 생성하고 관계가 있다면 관계도 생성
  // .sync({ force: true })
  // force: ture -> DB 변경사항 덮어씌울건지 -> 새로만들어져서 데이터 초기화
  .then((result) => {
    http.listen(8000, () => {
      console.log("Server start!s");
    });
  })
  .catch((err) => {
    console.log(err);
  });
