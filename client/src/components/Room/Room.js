import io from "socket.io-client";
import Chat from "../Chat/Chat";
import './Room.scss';
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import GetWebcam from "../getWebCam/GetWebCam";
import GetWebScreen from "../getWebScreen/GetWebScreen";

const socket = io.connect("http://localhost:8000");

const Room = () => {
  const [playing, setPlaying] = useState({ video: true, audio: true });
  const [roomName, setRoomname] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  let roomname;
  let myStream;
  let myPeerConnection;

  // 추후 링크 공유 위하여 필요
  useEffect(() => {
    if (searchParams.get('roomId')) {
      console.log(searchParams.get('roomId'));
    } else {
    }
  }, []);

  const videoRef = useRef(null); // 비디오
  const inputRef = useRef(null); // 방이름
  
  
  // 방제목 입력 기능 부분
  async function event() {
    roomname = inputRef.current.children[0].value;
    const NickName = inputRef.current.children[1].value;
    setRoomname(roomname);
    inputRef.current.children[0].value = "";
    inputRef.current.hidden = true;
    
    // 캠 공유 시작
    await GetWebcam(playing, (stream) => {
      videoRef.current.srcObject = stream;
    });
    await makeConnection();

    // 방 정보 보내기 및 방 참가 시작 
    socket.emit("join_room", roomname);
    socket.emit("nickname", NickName);
  }

  // RTC Code(실제로 연결을 만드는 함수)
  async function makeConnection () {
    const initialConstrains = {
      audio: true, 
      video: { facingMode: 'user' }, 
    };
    myStream = await navigator.mediaDevices.getUserMedia(initialConstrains); // 오디오, 비디오 트랙 담아주기 
    myPeerConnection = new RTCPeerConnection(); // peer connection 생성
    myPeerConnection.addEventListener('icecandidate', handleIce);
    myPeerConnection.addEventListener('addstream', handleAddStream);
    myStream
      .getTracks()
      .forEach(track => myPeerConnection.addTrack(track, myStream));
  }

  // ice 전달 
  socket.on('ice', ice => {
    console.log('received the answer');
    myPeerConnection.addIceCandidate(ice); 
  })

  // iceCandidate EventListener
  function handleIce(data) {
    console.log('sent candidate');
    socket.emit('ice', data.candidate, roomname);
  }
  function handleAddStream(data) {
    console.log('got an event from my peer');
    const peersStream = document.getElementById('guestVedio');
    peersStream.srcObject = data.stream;
  }

  // offer&answer 왕복 전달
  socket.on("welcome", async () => {
    // Peer A : make offer
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    console.log("sent offer: ", offer);
    socket.emit("offer", offer, roomname);
    console.log('sent the offer');
  });
  // Peer B : answer
  socket.on("offer", async (offer) => {
    console.log("received offer: ", offer);
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    socket.emit("answer", answer, roomname);
    console.log("sent the answer: ", answer);
  });
  socket.on("answer", async (answer) => {
    myPeerConnection.setRemoteDescription(answer); 
    console.log("got answer: ", answer);
  });

  // start, stop 버튼 이벤트
  const startOrStop = async(media) => {
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
    /* 수정 중 구역 */
    // 변경사항 steam에 저장하여 보내기
    // myStream = await navigator.mediaDevices.getUserMedia(playing)
    // 변경 사항 stream에 저장 써보는 중
    // if (myPeerConnection) {
    //   const mediaSender = myPeerConnection
    //     .getSenders()
    //     .find((sender) => sender.track.kind = `${media}`);
    //   console.log('Sender : ', mediaSender);
    // }
    // 카메라 변경 예시 코드
    // if(myPeerConnection) {
    //   const videoTrack = myStream.getVideoTracks()[0]
    //   const videoSender = myPeerConnection
    //     .getSenders()
    //     .find((sender) => sender.track.kind === 'video');
    //   videoSender.replaceTrack(videoTrack);
    // } 
  };

  // on&off위하여 setPlaying 값 변환 함수
  const changeState = (media) => {
    // shallow copy & deep copy
    let origin = JSON.parse(JSON.stringify(playing));
    origin[media] = !playing[media];
    setPlaying(origin);
  };

  // 화면 공유 기능 시작
  const screenShare = () => {
    GetWebScreen();
  }

  return (
    // 방 input

    <div className="RoomApp" style={{ marginTop: "150px" }}>
        {/* 방, 닉네임 입력 박스 */}
        <div className="roomData"  id="roomData"  ref={inputRef}>
          <input type="text" placeholder="방 이름" name="roomName"></input>
          <input type="text" placeholder="닉네임을 정해주세요" name="NickName"></input>
          <button onClick={event}>입장</button>
        </div>
      <div className="WebCam">
        <div className="videoApp">
          <div className="videoBox"><video ref={videoRef} autoPlay /></div> {/* 내 화면*/}
          <div className="videoBox"><video id="guestVedio" autoPlay /></div> {/* 상대 화면*/}
          {/* on&off 버튼 및 화면공유 버튼 */}

          <div className="videobutton">
            <button onClick={() => startOrStop("video")}>
              {playing["video"] ? "비디오 Stop" : "비디오 Start"}
            </button>
            <button onClick={() => startOrStop("audio")}>
              {playing["audio"] ? "오디오 Stop" : "오디오 Start"}
            </button>
          <button onClick={ screenShare }>화면 공유</button>
          </div>
        </div>
        {/* 채팅 시스템 */}
        <div className="Chat"><Chat socket={ socket } roomName={roomName}/></div>
      </div>
    </div>
  );
};

export default Room;