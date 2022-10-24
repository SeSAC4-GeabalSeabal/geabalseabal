import io from "socket.io-client";
import Chat from "../Chat/Chat";
import React, { useRef, useState } from "react";
import GetWebcam from "../getWebCam/GetWebCam";

const socket = io.connect("http://localhost:8000");
const myPeerConnection = new RTCPeerConnection();

const Room = () => {
  const [playing, setPlaying] = useState({ video: false, audio: false });

  const videoRef = useRef(null); // 비디오
  const inputRef = useRef(null); // 방이름

  // 방제목 입력 기능 부분
  function event() {
    const roomName = inputRef.current.children[0].value;
    const NickName = inputRef.current.children[1].value;
    console.log(roomName);
    console.log(NickName);
    inputRef.current.children[0].value = "";
    inputRef.current.hidden = true;
    // .hidden -> input and button 가리기
    socket.emit("join_room", roomName);
    socket.emit("nickname", NickName);
    console.log("룸 생성 성공");

    GetWebcam((stream) => {
      setPlaying({ video: true, audio: true });
      videoRef.current.srcObject = stream;
    });

    socket.on("welcome", () => {
      // Peer A : make offer
      const offer = myPeerConnection.createOffer();
      myPeerConnection.setLocalDescription(offer);
      console.log("Sent the offer");
      socket.emit("offer", offer, roomName);
      // Peer B : answer
      socket.on("offer", (offer, roomName) => {
        console.log("received offer: ", offer);
        myPeerConnection.setRemoteDescription(offer);
        const answer = myPeerConnection.createAnswer();
        myPeerConnection.setLocalDescription(answer);
        socket.emit("answer", answer, roomName);
        console.log("sent the answer");
      });
    });
  }

  // start, stop 버튼 이벤트
  const startOrStop = (media) => {
    console.log("playing", playing);
    if (playing[`${media}`]) {
      const s = videoRef.current.srcObject;
      const content = s.getTracks().filter((track) => track.kind == `${media}`);
      content[0].stop();
    } else {
      GetWebcam((stream) => {
        videoRef.current.srcObject = stream;
      });
    }
    changeState(media);
  };
  // 버튼확인 위하여 setPlaying 값 변환
  const changeState = (media) => {
    // shallow copy & deep copy
    let origin = JSON.parse(JSON.stringify(playing));
    for (const [key, value] of Object.entries(origin)) {
      if (key == media) origin[key] = !value;
      else origin[key] = value;
    }
    setPlaying(origin);
  };
  return (
    // 방 input
    <>
      <div className="RoomApp">
        <div className="roomData" id="roomData" style={{ marginTop: "200px" }} ref={inputRef}>
          <input type="text" placeholder="방 이름" name="roomName"></input>
          <input type='text' placeholder='닉네임을 정해주세요' name='NickName'></input>
          <button onClick={event}>전송</button>
        </div>
        <Chat />
      </div>
      <div>
        <video ref={videoRef} autoPlay />
        <button onClick={() => startOrStop("video")}>{playing["video"] ? "비디오 Stop" : "비디오 Start"}</button>
        <button onClick={() => startOrStop("audio")}>{playing["audio"] ? "오디오 Stop" : "오디오 Start"}</button>
      </div>
    </>
  );
};

export default Room;
