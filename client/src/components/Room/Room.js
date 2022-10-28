import io from "socket.io-client";
import Chat from "../Chat/Chat";
import "./Room.scss";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GetWebcam from "../getWebCam/GetWebCam";
import GetWebScreen from "../getWebScreen/GetWebScreen";

const socket = io.connect("http://localhost:8000");

const Room = () => {
  const [playing, setPlaying] = useState({ video: true, audio: true });
  const [roomName, setRoomname] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const videoRef = useRef(null); // 비디오
  const inputRef = useRef(null); // 방이름(방장인 경우)
  const guestRef = useRef(null); // 방이름(방장인 경우)

  let roomname;
  let myStream;
  let myPeerConnection;

  // 방제목 입력 기능 부분
  async function event() {
    var NickName = "";
    if ( inputRef.current == null ) {
      roomname = roomName;
      NickName = guestRef.current.children[0].value;      
    } else {
      roomname = inputRef.current.children[0].value;
      NickName = inputRef.current.children[1].value;
      
      inputRef.current.children[0].value = "";
    }
    setRoomname(roomname);

    // 캠 공유 시작
    await GetWebcam(playing, (stream) => {
      videoRef.current.srcObject = stream;
    });
    await makeConnection();

    // 방 정보 보내기 및 방 참가 시작, 방 만들기 실패
    socket.emit("join_room", roomname); // 1. room 인풋 값 보내기
    socket.emit("nickname", NickName);
    socket.on("result", (msg) => {
      if (msg == "failed") {
        alert("이미 대화 중인 방 입니다.");
      }
    });
  }

  // 게스트 방 들어온 경우 roomId -> roomName 변환
  useEffect(() => {
    if ( searchParams.get("roomId") != null || searchParams.get("roomId") != undefined ) {
      socket.emit("guest_room_name", searchParams.get("roomId"));
      socket.on('guest_room', (r) => {
        roomname = r;
        setRoomname(roomname);
      });
    }
  }, []);

  // RTC Code(실제로 연결을 만드는 함수)
  async function makeConnection() {
    const initialConstrains = {
      audio: true,
      video: { facingMode: "user" },
    };
    myStream = await navigator.mediaDevices.getUserMedia(initialConstrains); // 오디오, 비디오 트랙 담아주기
    myPeerConnection = new RTCPeerConnection(); // peer connection 생성
    myPeerConnection.addEventListener("icecandidate", handleIce);
    myPeerConnection.addEventListener("addstream", handleAddStream);
    myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream));
  }

  // ice 전달
  socket.on("ice", (ice) => {
    myPeerConnection.addIceCandidate(ice);
  });

  // iceCandidate EventListener
  let ice = null;
  function handleIce(data) {
    if ( data.candidate != null ) ice = data.candidate;
    socket.emit("ice", ice, ( roomname == undefined ? roomName : roomname ));
  }
  function handleAddStream(data) {
    console.log("got an event from my peer");
    const peersStream = document.getElementById("guestVedio");
    peersStream.srcObject = data.stream;
  }

  // offer&answer 왕복 전달
  socket.on("welcome", async () => {
    // 처음 유저: 오퍼를 보낸다
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    socket.emit("offer", offer, ( roomname == undefined ? roomName : roomname ));
  });
  // 나중 유저: 오퍼 받고, answer 보낸다
  socket.on("offer", async (offer) => {
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    socket.emit("answer", answer, ( roomname == undefined ? roomName : roomname ));
  });
  // 처음 유저: answer 받음
  socket.on("answer", async (answer) => {
    myPeerConnection.setRemoteDescription(answer);
  });

  // start, stop 버튼 이벤트
  const startOrStop = async (media) => {
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
  };

  // 초대 링크 기능 
  const invite = () => {

  } 
  
  return (
    // 방 input
    <div className="RoomApp" style={{ marginTop: "150px" }}>
      {/* 방, 닉네임 입력 박스 */}
      {!searchParams.get("roomId")?
      (<div className="roomData" id="roomData" ref={inputRef}>
        <input type="text" placeholder="방 이름" name="roomName"></input>
        <input type="text" placeholder="닉네임을 정해주세요" name="NickName"></input>
        <button onClick={event}>입장</button>
      </div>) : ""}
      {searchParams.get("roomId")?
      (<div className="roomData" id="guestData" ref={guestRef}>
        <input type="text" placeholder="닉네임을 정해주세요" name="NickName"></input>
        <button onClick={ event }>입장</button>
      </div>): ""}
      <div className="WebCam">
        <div className="videoApp">
          <div className="videoBox">
            <video ref={videoRef} autoPlay />
          </div>{" "}
          {/* 내 화면*/}
          <div className="videoBox">
            <video id="guestVedio" autoPlay />
          </div>{" "}
          {/* 상대 화면*/}
          {/* on&off 버튼 및 화면공유 버튼 */}
          <div className="videobutton">
            <button onClick={() => startOrStop("video")}>{playing["video"] ? "비디오 Stop" : "비디오 Start"}</button>
            <button onClick={() => startOrStop("audio")}>{playing["audio"] ? "오디오 Stop" : "오디오 Start"}</button>
            <button onClick={ screenShare }>화면 공유</button>
            <button onClick={ invite }>공유</button>
          </div>
        </div>
        {/* 채팅 시스템 */}
        <div className="Chat">
          <Chat socket={socket} roomName={( roomname == undefined ? roomName : roomname )} />
        </div>
      </div>
    </div>
  );
};

export default Room;
