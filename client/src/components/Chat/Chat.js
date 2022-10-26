import React, {useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./Chat.scss";

  function Chat({socket, roomName}) {
    // 내가 지금 1일 때. scss 편하게하는 법.
    // let temp = [
    //   {name: '1', message: '반갑습니다.'},
    //   {name: '2', message: '222.'},
    //   {name: '2', message: '123123.'},
    //   {name: '1', message: 'ㅈㄷㅇㅈㄷㄹ.'},
    //   {name: '1', message: '123312.'},
    // ]
    // const [chatArr, setChatArr] = useState(temp);

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

      //입장 메시지
      socket.on("welcome", (nickname) => {
        console.log( "welcone " );
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
                <div>{e.content}</div>
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

