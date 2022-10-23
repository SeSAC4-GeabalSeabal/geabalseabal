import React, { useCallback, useEffect, useState } from "react";
import "./Chat.scss";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");


socket.emit("init", { name: "Sanghoon" });


function Chat() {
  const [chatArr, setChatArr] = useState([]);
  const [chat, setChat] = useState({ name: "", message: "" });
  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);
  useEffect(() => {
    socket.on("receive message", (message) => {
      setChatArr((chatArr) => chatArr.concat(message));
    }); //receive message이벤트에 대한 콜백을 등록해줌
  }, []);
  const buttonHandler = useCallback(() => {
    socket.emit("send message", { name: chat.name, message: chat.message }); 
    //버튼을 클릭했을 때 send message이벤트 발생
  }, [chat]);
  const changeMessage = useCallback(
    (e) => {
      setChat({ name: chat.name, message: e.target.value });
    },
    [chat]
  );
  const changeName = useCallback(
    (e) => {
      setChat({ name: e.target.value, message: chat.message });
    },
    [chat]
  );
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
        <div className="InputBox">
          <input placeholder="내용" onChange={changeMessage}></input>
          <input placeholder="이름" onChange={changeName}></input>
          <button onClick={buttonHandler}>등록</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;