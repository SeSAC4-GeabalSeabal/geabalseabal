import io from "socket.io-client";
import Chat from "../Chat/Chat";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import GetWebcam from "../getWebCam/GetWebCam";
import GetWebScreen from "../getWebScreen/GetWebScreen";

const socket = io.connect("http://localhost:8000");

const Room = () => {
  const [playing, setPlaying] = useState({ video: true, audio: true });
  const [roomName, setRoomname] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('roomId')) {
      console.log(searchParams.get('roomId'));
    } else {
    }
  }, []);

  const videoRef = useRef(null); // 비디오
  const inputRef = useRef(null); // 방이름
  // 방제목 입력 기능 부분
  function event() {
    const roomName = inputRef.current.children[0].value;
    const NickName = inputRef.current.children[1].value;
    setRoomname(roomName);
    inputRef.current.children[0].value = "";
    inputRef.current.hidden = true;
    // .hidden -> input and button 가리기
    socket.emit("join_room", roomName);
    socket.emit("nickname", NickName);
    // 캠 공유 시작
    GetWebcam(playing, (stream) => {
      videoRef.current.srcObject = stream;
    });
    //RTC code
    function makeConnection() {
      let myPeerConnection = new RTCPeerConnection();
      console.log(
        GetWebcam.getTracks().forEach((track) =>
          myPeerConnection.addTrack(track, GetWebcam)
        )
      );
    }
    // Socket code
    socket.on("welcome", async () => {
      console.log("welcome");
      // Peer A : make offer
      const myPeerConnection = new RTCPeerConnection();
      const offer = await myPeerConnection.createOffer();
      myPeerConnection.setLocalDescription(offer);
      socket.emit("offer", offer, roomName);
      console.log("sent offer: ", offer);
    });
    // Peer B : answer
    socket.on("offer", async (offer) => {
      const myPeerConnection = new RTCPeerConnection();
      console.log("received offer: ", offer);
      myPeerConnection.setRemoteDescription(offer);
      const answer = await myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer);
      socket.emit("answer", answer, roomName);
      console.log("sent the answer: ", answer);
    });
    socket.on("answer", async (answer) => {
      console.log("got answer: ", answer);
    });
  }

  // start, stop 버튼 이벤트
  const startOrStop = (media) => {
    if (playing[`${media}`]) {
      const s = videoRef.current.srcObject;
      const content = s.getTracks().filter((track) => track.kind == `${media}`);
      content[0].stop();
    } else {
      let data = JSON.parse(JSON.stringify(playing));
      data[media] = !playing[`${media}`];
      GetWebcam(data, (stream) => {
        videoRef.current.srcObject = stream;
      });
    }
    changeState(media);
  };
  // 버튼확인 위하여 setPlaying 값 변환
  const changeState = (media) => {
    // shallow copy & deep copy
    let origin = JSON.parse(JSON.stringify(playing));
    origin[media] = !playing[media];
    setPlaying(origin);
  };
  // 화면 공유 기능
  const screenShare = () => {
    GetWebScreen();
  }
  return (
    <>
      <div className="RoomApp">
        <div
          className="roomData"
          id="roomData"
          style={{ marginTop: "200px" }}
          ref={inputRef}
        >
          <input type="text" placeholder="방 이름" name="roomName"></input>
          <input
            type="text"
            placeholder="닉네임을 정해주세요"
            name="NickName"
          ></input>
          <button onClick={event}>입장</button>
        </div>
        <Chat socket={ socket } roomName={roomName}/>
      </div>
      <div>
        <video ref={videoRef} autoPlay />
        <button onClick={() => startOrStop("video")}>
          {playing["video"] ? "비디오 Stop" : "비디오 Start"}
        </button>
        <button onClick={() => startOrStop("audio")}>
          {playing["audio"] ? "오디오 Stop" : "오디오 Start"}
        </button>
        <button onClick={ screenShare }>화면 공유</button>
      </div>
    </>
  );
};

export default Room;
