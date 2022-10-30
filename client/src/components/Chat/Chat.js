import React, {useEffect, useState, useRef, useCallback, Component } from "react";
import { io } from "socket.io-client";
import "./Chat.scss";
import dayjs from "dayjs";
import { renderMatches } from "react-router-dom";
import $ from 'jquery';

  function Chat({socket, roomName}) {

    const [chatArr, setChatArr] = useState([]);
    const inputRef = useRef(null); // 채팅 내용
    
    useEffect(() => {
      // 닉네임 및 메세지 받는 부분
      socket.on("new_message", (nickname, message) => {
        let chat = {
          name : nickname, 
          message : message,
          time: dayjs().format("A HH:mm"),
        }
        setChatArr((prevList) => [...prevList, chat]);
        $('.ChatBox').scrollTop($('.ChatBox')[0].scrollHeight);
      });

      //입장 메시지
      socket.on("welcome", (nickname) => {
        console.log( nickname );
        const notice = {
          content: `${nickname}님이 들어오셨습니다.`,
        };
        setChatArr((prevList) => [...prevList, notice]);
      });

      //퇴장 메시지
      socket.on("bye", (nickname) => {
        const notice = {
          content: `${nickname}님이 나가셨습니다.`,
        };
        setChatArr((prevList) => [...prevList, notice]);
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
                <div className="inout_msg">{e.content}</div> 
                <div>{e.name}</div> 
                <div className="ChatLog">{e.message}</div>
                <div className="chatTime">{e.time}</div>
              </div>
            ))}
          </div>
          <div className="InputBox" ref={inputRef}>
            <input placeholder="Type your message here..."
              onKeyPress={(e) => {
                if(window.event.keyCode===13){submit();}
                inputRef.current.children[0].value = "";}} ></input>
            <button onClick={ submit }>SEND</button>
          </div>
        </div>
      </div>
    );
  };

  export default Chat;



