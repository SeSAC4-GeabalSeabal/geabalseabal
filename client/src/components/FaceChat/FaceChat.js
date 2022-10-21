import { useState, useEffect, useRef } from "react";
// import './FaceChat.scss';


const FaceChat = () => {
// const user = 
// const state = ;
    
async function getMedia(constraints) {
    let stream = null;
  
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      /* use the stream */
    } catch (err) {
      /* handle the error */
    }
  }

    return(
        <div className="FaceChat">
         <div><video id="localVideo" autoplay playsinline></video></div>
         <div><video id="remoteVideo" autoplay playsinline></video></div>

         <div>
            <button id="startButton">Start</button>     
            {/* // local 의  video  */}
            <button id="callButton">Call</button> 
              {/* // remote 의 video  */}
            <button id="hangupButton">Hang Up</button>  
            {/* // remote의 연결종료 */}
        </div>
        </div>
    );
}
export default FaceChat;

