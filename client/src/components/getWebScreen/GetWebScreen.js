const GetWebScreen = async () => {
  try {
    const constraints = {
      video: {
        cursor: "always" | "motion" | "never",
        displaySurface: "application" | "browser" | "monitor" | "window",
      },
      audio: false,
    }
    navigator.mediaDevices.getDisplayMedia(constraints); 
  } catch(e) {
    console.log(e);
    return undefined;
  }
}

export default GetWebScreen;

// const GetWebScreen = () => {
//   navigator.mediaDevices
//     .getDisplayMedia({
//       video: { cursor: 'always' },
//       audio: { echoCancellation: true, noiseSuppression: true },
//     })
//     .then((stream) => {
//       videoRef.current.srcObject = stream; // 내 비디오 공유 화면으로 변경
//       const videoTrack = stream.getVideoTracks()[0];
//       connectionRef.current
//         .getSenders()
//         .find((sender) => sender.track.kind === videoTrack.kind)
//         .replaceTrack(videoTrack);
//       videoTrack.onended = function () {
//         const screenTrack = userStream.current.getVideoTracks()[0];
//         connectionRef.current
//           .getSenders()
//           .find((sender) => sender.track.kind === screenTrack.kind)
//           .replaceTrack(screenTrack);
//         stream.getTracks().forEach((track) => track.stop());
//         myVideo.current.srcObject = userStream.current; // 내 비디오로 변경
//       };
//     });
// };