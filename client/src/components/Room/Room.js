import axios from 'axios';
import io from 'socket.io-client';
import React, { useEffec, useRef } from 'react';

export const socket = io('http://localhost:8000')
export const SocketContext = React.createContext();

const Room = () => {
  const inputRef = useRef(null);
  // const sendRoom = async () => {
    // await axios({
    //   method: 'post',
    //   url: '/room',
    //   data: {
    //       name: ''
    //   }
    // });
    // name 가져오는 거는 아래 input 창 만들고 ref로 연결해서 가져오기
    // 코딩온 플랫폼의 DOM에 접근하는 ref 수업 듣고 만들어라. 
  // }
  function event() {
    const roomName = inputRef.current.value;
    console.log(inputRef.current.value);
    inputRef.current.value = '';
    socket.emit('join_room', roomName);
    console.log('시하 바보');
  };
  return(
    <div style={{marginTop: "200px"}}>
      <input type='test' placeholder='방 이름' name='roomName' ref={inputRef}></input>
      <button onClick={ event }>전송</button>
    </div>
  );
}
export default Room;