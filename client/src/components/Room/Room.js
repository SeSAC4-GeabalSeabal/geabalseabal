import axios from 'axios';
import io from 'socket.io-client';
import Chat from '../Chat/Chat'
import React, { useEffect, useRef, useState } from 'react';
import GetWebcam from '../getWebCam/GetWebCam';

const socket = io.connect("http://localhost:8000");

const Room = () => {
  const [playing, setPlaying] = useState(null);

  const videoRef = useRef(null); // 비디오
  const inputRef = useRef(null); // 방이름
  // 방제목 입력 기능 부분
  function event() {
    const roomName = inputRef.current.value;
    console.log(inputRef.current.value);
    inputRef.current.value = '';
    socket.emit('join_room', roomName);
    console.log('룸 생성 성공');
    GetWebcam((stream) => {
      setPlaying(true);
      videoRef.current.srcObject = stream;
    }); 
  };
  const startOrStop = () => {
    if (playing) {
      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
        track.stop();
      });
    } else {
      GetWebcam((stream => {
        setPlaying(true);
        videoRef.current.srcObject = stream;
      }));
    }
    setPlaying(!playing);
  }
  return(
    // 방 input
    <>
    <div className='RoomApp'>
    <div className="roomData" style={{marginTop: "200px"}}>
      <input type='test' placeholder='방 이름' name='roomName' ref={inputRef}></input>
      <button onClick={ event }>전송</button>
    </div>
    <Chat />
    </div>
      <div>
        <video ref={videoRef} autoPlay /> 
        <button onClick={() => startOrStop()}>{playing? 'Stop':'Start'}</button>
      </div>
    </>
    // 방제목 입력 되면서 방 join되는 부분까지 확인하였고, 방 join되면서 히든 처리해주고 화면공유 부분이랑 채팅 태그로 여기다 추가해주세요~~!! 
  );
}
export default Room;

