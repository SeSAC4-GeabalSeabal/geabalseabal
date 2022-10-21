import axios from 'axios';

const Room = () => {
    const sendRoom = async () => {
        await axios({
            method: 'post',
            url: '/room',
            data: {
                name: ''
            }
        });
        // name 가져오는 거는 아래 input 창 만들고 ref로 연결해서 가져오기
        // 코딩온 플랫폼의 DOM에 접근하는 ref 수업 듣고 만들어라. 
    }
  return(
    <div style={{marginTop: "200px"}}>
        adfasdf
    </div>
  );
}
export default Room;