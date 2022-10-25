import Main10 from "../img/Main10.jpg";
import Main9 from "../img/Main9.jpg";
//import Main5 from "../img/Main5.bmp";
//import Main7 from "../img/Main7.bmp";
//import Main8 from "../img/Main8.png";
import Main11 from "../img/Main11.jpg";
import "./Main.scss";
import { useEffect } from "react";
import axios from 'axios';

const Main = ( props ) => {
    
  useEffect(() => {
        axios.get('http://localhost:8000/')
        .then((result) => {
            props.setIsLogin(true);
        });
    }, []);
    //로그인이 잘 되었는지 확인.

  return (
    <>
    <div className="main">
        <div className="first">
            <div className="main-text">
                <h1>모든 사용자를 위한 영상 통화 및 화상 회의</h1>
                <p>개발새발은 기기 종류와 관계없이 모든 사용자에게 안전하고 품질이 우수한 화상 회의와 영상 통화 기능을 제공하는 서비스입니다.</p>
                <h1>개발새발은 여러분을 위한 것입니다.</h1>
                <p>개발새발은 사용자가 연결하고, 커뮤니케이션하고, 아이디어를 표현함으로써 모두가 함께 더 많은 일을 성취할 수 있도록 지원합니다. 
                    수백만의 대기업, 중소기업 및 여러분과 같은 수많은 개인 사용자의 신뢰를 받고 있다는 것이 자랑스럽습니다.</p>
            </div>
            <div className="image">
                <img src={Main10} alt="img" />
                <img src={Main9} alt="img" />
            </div>
        </div>
    </div>

    <div className="skill">
        <h1>주요 기능</h1>
        <div className="skillcard">
            <div className="s-card">
                <div className="s-img">
                    <img src={Main10} alt="skill" />
                </div>
                <h4>화상 회의</h4>
                <p>언제 어디서든 자유롭게 화상 회의를 진행할 수 있습니다. </p>
            </div>
            <div className="s-card">
                <div className="s-img">
                    <img src={Main11} alt="skill" />
                </div>
                <h4>화면 공유</h4>
                <p>화면 공유를 통해 더 원활한 회의를 지원합니다.</p>
            </div>
            <div className="s-card">
                <div className="s-img">
                    <img src={Main9} alt="skill" />
                </div>
                <h4>실시간 채팅</h4>
                <p>코드 블럭과 코드 펜까지 사용 가능한 개발새발만의 주요 기능입니다.</p>
            </div>
        </div>
    </div>
    </>
  );
};
export default Main;

// <a href="https://kr.freepik.com/free-photo/3d_30117668.htm#&position=4&from_view=collections">Freepik</a>
// <a href="https://kr.freepik.com/free-photo/3d_30117670.htm#&position=2&from_view=collections">Freepik</a>
// <a href="https://kr.freepik.com/free-photo/3d_30117667.htm#&position=3&from_view=collections">Freepik</a>

//<a href="https://www.freepik.com/free-vector/corporate-culture-online-service-platform-corporate-relations-business-ethics-corporate-regulations-compliance-online-partnership-isolated-flat-vector-illustration_25523418.htm#page=7&query=people%20illustration&position=14&from_view=search&track=sph">Image by vector4stock</a> on Freepik
//<a href="https://www.freepik.com/free-vector/business-team-concept-idea-strategy-achievement-teamwork-team-building-group-people-work-together-business-development-communication-cooperation-vector-flat-illustration_26196021.htm#page=51&query=people%20illustration&position=4&from_view=search&track=sph">Image by vector4stock</a> on Freepik