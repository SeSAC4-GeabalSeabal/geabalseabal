import React from "react";

const GetWebcam = async (callback) => {
  try {
    const constraints = {
        'video': true, 
        'audio': true, 
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(callback);
  } catch(e) {
    console.log(e);
    return undefined;
  }
}

export default GetWebcam;