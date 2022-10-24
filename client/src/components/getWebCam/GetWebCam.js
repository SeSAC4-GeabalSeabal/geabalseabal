import React from "react";

const GetWebcam = async (callback) => {
  try {
    const constraints = {
        'video': true, 
        'audio': false
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(callback);
    const devices = await navigator.mediaDevices.enumerateDevices()
    const cameras = devices.filter(device => device.kind === 'videoinput');
  } catch(e) {
    console.log(e);
    return undefined;
  }
}

export default GetWebcam;