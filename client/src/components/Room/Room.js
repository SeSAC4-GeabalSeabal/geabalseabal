import axios from "axios";
import io from "socket.io-client";
import Chat from "../Chat/Chat";
import React, { useEffect, useRef, useState } from "react";
import GetWebcam from "../getWebCam/GetWebCam";

const socket = io.connect("http://localhost:8000");
let myPeerConnection = new RTCPeerConnection();

const Room = () => {
  const [playing, setPlaying] = useState({'video': false, 'audio': false});

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
      setPlaying({video: true, audio: true});
      videoRef.current.srcObject = stream;
    }); 

    // Peer A : make offer
    const offer = myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    console.log("Sent the offer");
    socket.emit("offer", offer, roomName);
    // Peer B : answer
    socket.on("offer", (offer) => {
      console.log("received the offer");
      myPeerConnection.setRemoteDescription(offer);
      const answer = myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer);
      socket.emit("answer", answer, roomName);
      console.log("sent the answer");
    });
  const startOrStop = (media) => {
    console.log('playing', playing );
    console.log('media', media );
    console.log('playing[media]', playing[`${media}`]);
    if (playing[`${media}`]) {
      const s = videoRef.current.srcObject;
      const content = s.getTracks().filter((track) => track.kind == `${media}`)
      console.log('content', content[0]);
      content[0].stop();
    } else {
      GetWebcam((stream => {
        videoRef.current.srcObject = stream;
      }));
    }
    changeState(media);
  }
  const changeState = ( media ) => {
    for ( const [ key, value ] of Object.entries(playing) ) {
      if ( key == media) playing[key] = !value;
      else playing[key] = value;
    }
    setPlaying(playing);
  }
  return(
    // 방 input
    <>
    <div className='RoomApp'>
      <div
        className="roomData"
        id="roomData"
        style={{ marginTop: "200px" }}
        ref={inputRef}
      >
      <input type="text" placeholder="방 이름" name="roomName"></input>
      <button onClick={ event }>전송</button>
    </div>
    <Chat />
    </div>
      <div>
        <video ref={videoRef} autoPlay /> 
        <button onClick={() => startOrStop('video')}>{playing? '비디오 Stop':'비디오 Start'}</button>
        <button onClick={() => startOrStop('audio')}>{playing? '오디오 Stop':'오디오 Start'}</button>
      </div>
    </>
    // 방제목 입력 되면서 방 join되는 부분까지 확인하였고, 방 join되면서 히든 처리해주고 화면공유 부분이랑 채팅 태그로 여기다 추가해주세요~~!! 
  );
}


export default Room;
