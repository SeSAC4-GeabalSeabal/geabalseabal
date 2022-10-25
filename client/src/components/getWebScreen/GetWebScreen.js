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