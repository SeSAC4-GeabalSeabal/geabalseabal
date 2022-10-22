import Main10 from "../img/Main10.jpg";
import Main9 from "../img/Main9.jpg";
//import Main5 from "../img/Main5.bmp";
//import Main7 from "../img/Main7.bmp";
//import Main8 from "../img/Main8.png";
import Main11 from "../img/Main11.jpg";
import "./Main.scss";

const Main = () => {
  return (
    <>
    <div className="main">
        <h1>모든 사용자를 위한 영상 통화 및 화상 회의</h1>
        <p>GEAbalSEAbal은 기기 종류와 관계없이 모든 사용자에게 안전하고 품질이 우수한 화상 회의와 영상 통화 기능을 제공하는 서비스입니다</p>
        <div className="first">
            <div className="main-text">
                <h2>화상 회의</h2>
                <p>EAbalSEAbal은 기기 종류와 관계없이 모든 사용자에게 안전하고 품질이 우수한 화상 회의와 영상 통화 기능을 제공하는 서비스입니다</p>
            </div>
            <div className="image">
                <img src={Main10} alt="img" />
                <img src={Main9} alt="img" />
            </div>
        </div>
    </div>

    <div className="skill">
        <h1>Skills</h1>
        <p>A better way for your remote team to Cowork togehter</p>
        <div className="skillcard">
            <div className="s-card">
                <div className="s-img">
                    <img src={Main11} alt="skill" />
                </div>
                <h4>skill</h4>
                <p>이용하세요.</p>
            </div>
            <div className="s-card">
                <div className="s-img">
                    <img src={Main10} alt="skill" />
                </div>
                <h4>skill</h4>
                <p>이용하세요.</p>
            </div>
            <div className="s-card">
                <div className="s-img">
                    <img src={Main9} alt="skill" />
                </div>
                <h4>skill</h4>
                <p>이용하세요.</p>
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
