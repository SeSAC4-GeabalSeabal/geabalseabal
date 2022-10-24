import React, {useEffect, useState, useRef } from "react";
import "./Chat.scss";

function Chat({socket, roomName}) {
  const [chatArr, setChatArr] = useState([]);
  const [chat, setChat] = useState({ name: "", message: "" });
  const inputRef = useRef(null); // 채팅 내용
  useEffect(() => {
    // socket.on("receive message", (message) => {
    //   console.log('message', message);
    //   setChatArr((chatArr) => chatArr.concat(message));
    // }); //receive message이벤트에 대한 콜백을 등록해줌
    socket.on("new_message", (message) => {
      console.log('message', message);
      setChatArr((chatArr) => chatArr.concat(message));
    }); //receive message이벤트에 대한 콜백을 등록해줌
  }, []);
  const submit = () => {
    const message = inputRef.current.children[0].value;
    socket.emit("new_message", message, roomName); 
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

