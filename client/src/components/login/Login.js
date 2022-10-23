import './Login.scss';
import axios from 'axios';

const Login = () => {
  return(
    <div className="Login">
      <h2>Social Login Button</h2>
      <a href="http://localhost:8000/login/google" className="Loginbox" id="google-connect"> <span>Connect with Google</span></a>
      <a href="http://localhost:8000/login/kakao" className="Loginbox" id="kakao-connect"> <span>Connect with kakao</span></a>
    </div>
  );
}
export default Login;


<div class="login-box">
      
      <a href="#" class="social-button" id="facebook-connect"> <span>Connect with Facebook</span></a>
      
      <a href="#" class="social-button" > <span>Connect with LinkedIn</span></a>
    </div> 
