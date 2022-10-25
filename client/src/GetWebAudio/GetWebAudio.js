import React from "react";

const GetWebAudio = async (callback) => {
  try {
    const constraints = {
        'video': false, 
        'audio': true, 
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(callback);
  } catch(e) {
    console.log(e);
    return undefined;
  }
}

export default GetWebAudio;