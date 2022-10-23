import "./Login.scss";
import axios from "axios";

const Login = () => {
  return (
    <div className="Login">
      <a href="http://localhost:8000/login/google">go to googlePassport</a>
      <br />
      <a href="http://localhost:8000/login/kakao">go to kakaoPassport</a>
    </div>
  );
};
export default Login;
