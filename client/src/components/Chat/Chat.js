import React, {useEffect, useState, useRef } from "react";
import "./Chat.scss";

function Chat({socket, roomName}) {
  const [chatArr, setChatArr] = useState([]);
  const inputRef = useRef(null); // 채팅 내용
  useEffect(() => {
    // 닉네임 및 메세지 받는 부분
    socket.on("new_message", (nickname, message) => {
      let chat = {
        name : nickname, 
        message : message
      }
      setChatArr((prevList) => [...prevList, chat]);
    }); 
  }, []);
  const submit = async () => {
    // 메세지 및 룸네임 보내기
    const message = inputRef.current.children[0].value;
    await socket.emit("new_message", message, roomName); 
  }
  return (
    <div className="ChatApp">
      <div className="Box">
        <div className="ChatBox">
          {chatArr.map((e) => (
            <div className="Chat">
              <div>{e.name}</div>
              <div className="ChatLog">{e.message}</div>
            </div>
          ))}
        </div>
        <div className="InputBox" ref={inputRef}>
          <input placeholder="내용"></input>
          <button onClick={ submit }>등록</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

