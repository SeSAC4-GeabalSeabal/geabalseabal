import io from "socket.io-client";
import Chat from "../Chat/Chat";
import "./Room.scss";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GetWebcam from "../getWebCam/GetWebCam";
import GetWebScreen from "../getWebScreen/GetWebScreen";
import Room4 from '../img/Room4.jpg';
import { Link } from 'react-router-dom';

const socket = io.connect("http://localhost:8000");

const Room = () => {
  const [playing, setPlaying] = useState({ video: true, audio: true });
  const [roomName, setRoomname] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [MyPeerConnection, setMyPeerConnection] = useState(null);

  const videoRef = useRef(null); // 비디오
  const inputRef = useRef(null); // 방이름(방장인 경우)
  const guestRef = useRef(null); // 방이름(방장인 경우)
  const screenRef = useRef(null);

  let roomname;
  let myStream;
  let myPeerConnection; 
  let roomId;

  // 방제목 입력 기능 부분
  function event() {
    let NickName = "";
    if (inputRef.current == null) {
      roomname = roomName;
      NickName = guestRef.current.children[0].value;

      eventDo(NickName);

    } else {
      roomname = inputRef.current.children[0].value;
      NickName = inputRef.current.children[1].value;

      inputRef.current.children[0].value = "";
      socket.emit("check_room", roomname);

      setRoomname(roomname);

      socket.on("checkResult", (result) => {
        if (result.result) eventDo(NickName);
        else alert(result.msg);

      });
    }
    if (inputRef.current) {
      inputRef.current.style.display = 'none';
    }
    if (guestRef.current) {
      guestRef.current.style.display = 'none';
    }
  }
  async function eventDo(NickName) {
    // 캠 공유 시작
    await GetWebcam(playing, (stream) => {
      videoRef.current.srcObject = stream;
    });
    await makeConnection();

    // 방 정보 보내기 및 방 참가 시작, 방 만들기 실패
    socket.emit("join_room", roomname); // 1. room 인풋 값 보내기
    socket.emit("nickname", NickName);
    socket.on("result", (msg) => {
      if (msg == false) {
        alert("이미 대화 중인 방 입니다.");
      }
    });
  }

  // 게스트 방 들어온 경우 roomId -> roomName 변환
  useEffect(() => {
    if (
      searchParams.get("roomId") != null ||
      searchParams.get("roomId") != undefined
    ) {
      socket.emit("guest_room_name", searchParams.get("roomId"));
      socket.on("guest_room", (r) => {
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
    myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
    setMyPeerConnection(myPeerConnection);
  }

  // ice 전달
  socket.on("ice", (ice) => {
    myPeerConnection.addIceCandidate(ice);
    setMyPeerConnection(myPeerConnection);
  });

  // iceCandidate EventListener
  let ice = null;
  function handleIce(data) {
    if (data.candidate != null) ice = data.candidate;
    socket.emit("ice", ice, roomname == undefined ? roomName : roomname);
  }
  function handleAddStream(data) {
    console.log("got an event from my peer");
    const peersStream = document.getElementById("guestVedio");
    peersStream.srcObject = data.stream;
  }
  // roomID 받아오기
  socket.on('socket_id', (id) => {
    roomId = id;
  })
  // offer&answer 왕복 전달
  socket.on("welcome", async () => {
    // 처음 유저: 오퍼를 보낸다
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    socket.emit("offer", offer, roomname == undefined ? roomName : roomname);
    setMyPeerConnection(myPeerConnection);
  });
  // 나중 유저: 오퍼 받고, answer 보낸다
  socket.on("offer", async (offer) => {
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    socket.emit("answer", answer, roomname == undefined ? roomName : roomname);
    setMyPeerConnection(myPeerConnection);
  });
  // 처음 유저: answer 받음
  socket.on("answer", async (answer) => {
    myPeerConnection.setRemoteDescription(answer);
    setMyPeerConnection(myPeerConnection);
  });

  //방 나가기
  // socket.on("leave", (r) => {
  //   roomname = r;
  //   const {roomname} = r;
  //   io.sockets.in(roomname).emit("leave");
  //   socket.leave(roomname);
  // });

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
    await changeState(media);

    // 캠 peer 연결 후 안되는 부분 해결중
    const newStream = await navigator.mediaDevices.getUserMedia(playing);
    myPeerConnection = MyPeerConnection;
    const videoTrack = newStream.getTracks()[1]
    console.log('videoTrack', videoTrack);
    const videoSender = MyPeerConnection
      .getSenders()[1]
      videoSender.replaceTrack(videoTrack);
    console.log('videoSender', videoSender);
    console.log('success');
  };

  // on&off위하여 setPlaying 값 변환 함수
  const changeState = (media) => {
    // shallow copy & deep copy
    let origin = JSON.parse(JSON.stringify(playing));
    origin[media] = !playing[media];
    setPlaying(origin);
  };

  // 화면 공유 기능 시작
  const screenShare = async() => {
    await GetWebScreen((mediaStream) => {
      console.log(mediaStream);
      screenRef.current.srcObject = mediaStream; 
    });
  };

  // 카카오톡 sdk 추가
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true; 
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // 초대 링크 기능
  const invite = () => {
    // kakao sdk script 부른 후 window.Kakao로 접근
    if (window.Kakao) {
      const kakao = window.Kakao;

      // 카카오에서 제공하는 javascript key이용하여 initialize
      if (!kakao.isInitialized()) {
        kakao.init(`${process.env.REACT_APP_KAKAO_JS}`);
      }

      kakao.Share.sendDefault({
        objectType: "feed", 
        content: {
          title: "개발새발", 
          description: "당신을 초대합니다.", 
          imageUrl: "https://i.pinimg.com/564x/da/1f/b3/da1fb39b3c4aeb177a1e8b95825d4b3e.jpg", 
          link : {
            mobileWebUrl:`http://localhost:3000/room?roomId=${roomId}`,
            webUrl:`http://localhost:3000/room?roomId=${roomId}`,
          },
        },
        social: {
          likeCount: 286,
          commentCount: 45,
          sharedCount: 845,
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: `http://localhost:3000/room?roomId=${roomId}`,
              webUrl: `http://localhost:3000/room?roomId=${roomId}`,
            },
          },
          {
            title: '앱으로 보기',
            link: {
              mobileWebUrl: `http://localhost:3000/room?roomId=${roomId}`,
              webUrl: `http://localhost:3000/room?roomId=${roomId}`,
            },
          },
        ], 
      });
    }
  };

  return (
    // 방 input
    <div className="RoomApp" style={{ marginTop: "150px" }}>
      {/* 방, 닉네임 입력 박스 */}
      {!searchParams.get("roomId") ? (
        <div className="roomData" id="roomData" ref={inputRef}>
          <input type="text" placeholder="방 이름" name="roomName"></input>
          <input
            type="text"
            placeholder="닉네임을 정해주세요"
            name="NickName"
          ></input>
          <button onClick={event}>입장</button>
        </div>
      ) : (
        ""
      )}
      {searchParams.get("roomId") ? (
        <div className="roomData" id="guestData" ref={guestRef}>
          <input
            type="text"
            placeholder="닉네임을 정해주세요"
            name="NickName"
          ></input>
          <button onClick={event}>입장</button>
        </div>
      ) : (
        ""
      )}
      
      {/* {searchParams.get("roomname")(
        <div className="leave" id="roomData" ref={inputRef}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p>나가기</p>
          </Link>
        </div>
      )};

      {searchParams.get("roomname")(
        <div className="leave" id="guestData" ref={guestRef}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p>나가기</p>
          </Link>
        </div>
      )}; */}

      <div className="WebCam">
        <div className="videoApp">
          {/* 내 화면*/}
          <div className="videoBox">
            <video ref={videoRef} autoPlay />
          </div>
          {/* 상대 화면*/}
          <div className="videoBox">
            <video id="guestVedio" autoPlay />
          </div>
          {/* 화면공유 */}
          <div className="videoBox">
            <video ref={screenRef} autoPlay/>
          </div>
          {/* on&off 버튼 및 화면공유 버튼 */}
          <div className="videobutton">
            <button onClick={() => startOrStop("video")}>
              {playing["video"] ? "비디오 Stop" : "비디오 Start"}
            </button>
            <button onClick={() => startOrStop("audio")}>
              {playing["audio"] ? "오디오 Stop" : "오디오 Start"}
            </button>
            <button onClick={screenShare}>화면 공유</button>
            <button onClick={invite}>공유</button>
          </div>
        </div>
        {/* 채팅 시스템 */}
        <div className="Chat">
          <Chat
            socket={socket}
            roomName={roomname == undefined ? roomName : roomname}
          />
        </div>
        <div>
          <img src={Room4} />
        </div>
      </div>
    </div>
  );
};

export default Room;



//<a href="https://www.freepik.com/free-vector/social-tree-concept-illustration_12491662.htm#page=4&query=social&position=6&from_view=search&track=sph">Image by storyset</a> on Freepik
//<a href="https://www.freepik.com/free-vector/ideas-sketch_2944686.htm#page=12&query=social&position=2&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik
//<a href="https://www.freepik.com/free-vector/set-devices-electronics-with-people-video-conference_7585977.htm#page=86&query=people&position=15&from_view=search&track=sph">Image by studiogstock</a> on Freepik
//<a href="https://www.freepik.com/free-vector/set-devices-electronics-with-people-video-conference_7585977.htm#page=86&query=people&position=15&from_view=search&track=sph">Image by studiogstock</a> on Freepik
//<a href="https://www.freepik.com/free-vector/flat-woman-home-office-with-laptop-conducting-video-meeting-team-building-with-colleagues-girl-chatting-talking-with-friends-online-vector-illustration-videoconference-remote-work_16503931.htm#page=5&query=computer&position=35&from_view=search&track=sph">Image by redgreystock</a> on Freepik
//<a href="https://www.freepik.com/free-vector/flat-design-twitch-panels_21251690.htm#page=7&query=computer&position=43&from_view=search&track=sph">Image by pikisuperstar</a> on Freepik
//<a href="https://www.freepik.com/free-vector/vector-set-social-media-icons_3425296.htm#page=12&query=computer&position=20&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik
//<a href="https://www.freepik.com/free-vector/variety-online-courses-with-teachers_8111091.htm#page=13&query=computer&position=19&from_view=search&track=sph">Image by pikisuperstar</a> on Freepik
//<a href="https://www.freepik.com/free-vector/flat-happy-people-celebrate-birthday-online-party-via-internet_24817776.htm#page=15&query=computer&position=13&from_view=search&track=sph">Image by redgreystock</a> on Freepik