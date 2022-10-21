import { useState, useEffect, useRef } from "react";
// import './FaceChat.scss';


const Login = () => {

    const login = () => {
        return function () {
          axios({
            method: "get",
            url: "localhost:8000/login/google",
            
          })
            .then((res) => { 
              dispatch(
                setUser({
                  email: res.data.email,
                  nickname: res.data.nickname,
                })
              );
            })
            .catch((error) => {
              
            });
        };
      };

    return(
        <div className="Login">
            <button onClick={login} />
        </div>
    );
}
export default Login;