import React, {useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./Chat.scss";
import dayjs from "dayjs";

  function Chat({socket, roomName}) {
    // 내가 지금 1일 때. scss 편하게하는 법.
    // let temp = [
    //   {name: '김민지', message: '반갑습니다. 반가워요. 화이팅'},
    //   {name: '김예은', message: '222.'},
    //   {name: '곽시하', message: '123123.'},
    //   {name: '최상훈', message: '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'},
    //   {name: '1', message: '123312.'},
    //   {name: '개발새발', message: '123312.'},
    // ]
    // const [chatArr, setChatArr] = useState(temp);

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
            <input placeholder="Type your message here..." onKeyPress={(e) => {
              if(window.event.keyCode===13){submit();}
            }} ></input>
            <button onClick={ submit }>SEND</button>
          </div>
        </div>
      </div>
    );
  }

  export default Chat;



// function Chat({socket, roomName}) {
//   const [chatArr, setChatArr] = useState([]);
//   const inputRef = useRef(null); // 채팅 내용

//   useEffect(() => {
//     // 닉네임 및 메세지 받는 부분
//     socket.on("new_message", (nickname, message) => {
//       let chat = {
//         name : nickname, 
//         message : message
//       }
//       setChatArr((prevList) => [...prevList, chat]);
//     }); 
//   }, []);
//   const submit = async () => {
//     // 메세지 및 룸네임 보내기
//     const message = inputRef.current.children[0].value;
//     await socket.emit("new_message", message, roomName); 
//   }
//   return (
//     <div className="ChatApp">
//       <div className="Box">
//         <div className="ChatBox">
//           {chatArr.map((e) => (
//             <div className="Chat">
//               <div>{e.name}</div>
//               <div className="ChatLog">{e.message}</div>
//             </div>
//           ))}
//         </div>
//         <div className="InputBox" ref={inputRef}>
//           <input placeholder="내용"></input>
//           <button onClick={ submit }>등록</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chat;

