import React from "react";

const GetWebcam = async (constraints, callback) => {
  try {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(callback);
  } catch(e) {
    console.log(e);
    return undefined;
  }
}

export default GetWebcam;