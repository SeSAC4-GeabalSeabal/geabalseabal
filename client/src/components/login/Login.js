import './Login.scss';
//import axios from 'axios';
import Login4 from '../img/Login4.jpg'

const Login = () => {
  return(
    <>
     <div className="back">
      <div className="left">
        <div className="comment">
          <h1>당신을 위한 서비스, 개발새발</h1>
          <p>프리미엄 화상 회의를 이제 누구나 무료로 이용할 수 있습니다.</p>
        </div>
        <img src={Login4} />
      </div>
      <div className="right">
        <h1>Social Login</h1>
        <a href="http://localhost:8000/login/google" className="google" style={{ textDecoration: 'none' }}> <span>Connect with Google</span></a>
        <a href="http://localhost:8000/login/kakao" className="kakao" style={{ textDecoration: 'none' }}> <span>Connect with kakao</span></a>
      </div>
    </div>
    {/* <div className="Login">
        <h2>Social Login</h2>
        <a href="http://localhost:8000/login/google" className="Loginbox" id="google-connect"> <span>Connect with Google</span></a>
        <a href="http://localhost:8000/login/kakao" className="Loginbox" id="kakao-connect"> <span>Connect with kakao</span></a>
    </div> */}
    </>
  );
}
export default Login;


{/* <div class="login-box">
      
      <a href="#" class="social-button" id="facebook-connect"> <span>Connect with Facebook</span></a>
      
      <a href="#" class="social-button" > <span>Connect with LinkedIn</span></a>
    </div>  */}


//<a href="https://www.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_10606197.htm#query=people%20illustration&position=9&from_view=keyword">Image by pch.vector</a> on Freepik
//<a href="https://www.freepik.com/free-vector/business-teambuilding-partnership-teamwork_30002726.htm#query=people%20illustration&position=38&from_view=search&track=sph">Image by upklyak</a> on Freepik
//Image by <a href="https://www.freepik.com/free-vector/hand-drawn-flat-design-group-people-background-composition_20548523.htm#page=3&query=people%20illustration&position=40&from_view=search&track=sph">Freepik</a>
//<a href="https://www.freepik.com/free-vector/flat-hand-drawn-people-starting-business-project_12810448.htm#page=4&query=people%20illustration&position=29&from_view=search&track=sph">Image by pikisuperstar</a> on Freepik
//<a href="https://www.freepik.com/free-vector/talent-choice-concept_9176866.htm#page=6&query=people%20illustration&position=7&from_view=search&track=sph">Image by pch.vector</a> on Freepik
//<a href="https://www.freepik.com/free-vector/team-collaboration-linear-concept-with-business-people-work-together-set-up-abstract-geometric-shapes-flying-air-employees-teamwork-cooperation-partnership-line-art-flat-vector-illustration_25917830.htm#page=6&query=people%20illustration&position=17&from_view=search&track=sph">Image by upklyak</a> on Freepik
//a href="https://www.freepik.com/free-vector/people-working-together-set-up-abstract-shapes_30538735.htm#page=18&query=people%20illustration&position=8&from_view=search&track=sph">Image by upklyak</a> on Freepik
//<a href="https://www.freepik.com/free-vector/hand-drawn-flat-design-connecting-people-infographic_20006906.htm#page=50&query=people%20illustration&position=14&from_view=search&track=sph">Image by pikisuperstar</a> on Freepik