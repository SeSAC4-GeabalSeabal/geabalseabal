export const selectSong = song => {
    return {
      type: 'SONG_SELECTED',
      payload: song,
    }
}
export const changeIsLogin = isLogin => {
    return {
        type: 'CHANGE',
        payload: isLogin
    }
}