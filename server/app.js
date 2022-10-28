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
  let sockets = {};
  socket["nickname"] = "익명"; // 기본 닉네임
  // console.log("im adapter: ", io.sockets.adapter);
  // 방장 방참여
  socket.on("check_room", (roomName) => {
    if (socket.adapter.rooms.get(roomName) != undefined) {
      socket.emit("result", {
        result: false,
        msg: roomName + "은 이미 존재하는 방입니다.",
      });
    } else socket.emit("result", { result: true, roomname: roomName });
  });
  socket.on("join_room", (roomName) => {
    // roomName 방제목으로 된 방이 없다면(새로운 방)
    if (!sockets[roomName]) {
      sockets[roomName] = [];
      socket.roomName = roomName; // 2. roomName 파라미터로 받은 값을 socket.roomName에 넣는다.
      sockets[roomName].push(socket); // 3. sockets에 새로운 방을 만든다
      socket.join(roomName); // 새로운 방 생성
      // console.log("socket 방 정보!!: ", socket.adapter);
    } else {
      console.log("asdas");
    }
    // 닉네임 받아와서 소켓에 저장
    socket.on("nickname", async (nickname) => {
      socket["nickname"] = nickname;
      // 방 사람들에게만 welocome 이벤트 생성 ! (입장 메세지 보내기)
      socket.to(roomName).emit("welcome", socket.nickname);
    });
  });
  
  // 손님 방참여
  socket.on("guest_room", (roomId) => {
    // ** roomId rooms목록 이용하여 roomName으로 전환 필요
    console.log(socket.adapter.rooms);
    console.log("id", socket.id);
    const roomList = socket.adapter.rooms;
  });
  

  // 새로운 채팅방 메세지 받고(Room 버전)
  socket.on("new_message", (msg, room) => {
    // 룸안에 있는 사람들에게만 닉네임, 메세지 함께 전달
    io.to(room).emit("new_message", socket.nickname, msg);
  });

  // 먼저 들어온 유저의 offer (local)받는 부분exit
  socket.on("offer", (offer, roomName) => {
    // 먼저 들어온 유저의 offer (remote) 보내는 부분(나중에 들어온 유저에게)
    socket.to(roomName).emit("offer", offer);
  });

  // 나중 들어온 유저의 answer (local)받는 부분
  socket.on("answer", (answer, roomName) => {
    // 나중 들어온 유저의 answer (remote) 보내는 부분(먼저 들어온 유저에게)
    socket.to(roomName).emit("answer", answer);
  });

  // iceCandidate
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });

  // 연결 끊어지기 직전에 bye 메세지 전송
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
    );
  });
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
