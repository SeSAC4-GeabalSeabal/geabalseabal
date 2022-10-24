import { Link } from 'react-router-dom';
import './Nav.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { changeIsLogin } from '../../actions'

const Nav = (props ) => {
    function logout(){
        axios({
            method: "post",
            url: "http://localhost:8000/logout",
            data: {}
        }).then((result) => {
            props.setIsLogin(false);
            console.log( "ppp : ", props );
        });
    }
    //routes에서 로그인이 되어도 app.js에서 nav 위치가 routes 밖에 있기 때문에 nav에도 axios를 해줘야 한다?

    return(
        <div className="container">
            <div className="loco">
                <Link to="/" style={{ textDecoration: 'none' }}>
                <h2><span>개</span>발<span>새</span>발</h2>
                </Link>
            </div>
            <div className="btn">
                <div className="room">
                    <Link to="/room" style={{ textDecoration: 'none' }}>
                        <p>Room</p>
                    </Link>
                </div>
                { props.isLogin ? (
                    <div className="logout">
                        <a onClick={logout} style={{ textDecoration: 'none' }}>
                            <p>Logout</p>
                        </a>
                    </div>
                    ) : (
                    <div className="login">
                        <Link to="/login"  style={{ textDecoration: 'none' }}>
                            <p>Login</p>
                        </Link>
                    </div>
                 )}
            </div>
        </div>
    );
}

export default Nav;

{/* Logout axios(post 방식, url localhost:8000/logout으로 보내기)로 보낸다음에 
then-> isLogin false면(로그인 실패) 다시 메인페이지로 가게 로직 구현해주세요! */}


// 



// function Logout(){

//     let form = document.getElementById("Login");

//     let isLogin = form.checkValidity();
    
//     if(isLogin){
//         form.reportvalidity();
//         return (
//                 <div className="logout">
//                     <a href='http://localhost:8000/logout' style={{ textDecoration: 'none' }}>
//                          <p>Logout</p>
//                      </a>
//                 </div> 
//         )} 
//     axios({
//         method:"post",
//         url:"http://localhost:8000/logout"
//         data: {
//             user_email: form.user_email.value,
//             password: form.password.value
//         }
//     }).then((Response) => {
//         return Response.data;
//     }).then((data) => {
//         if(data){
//             form.user_email.value="",
//             form.user.value="";
//         }else{
//             location.href="/";
//         }
        
//     })
// }

