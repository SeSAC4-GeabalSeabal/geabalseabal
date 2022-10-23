import { Link } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
    return(
        <div className="container">
            <div className="loco">
                <Link to="/" style={{ textDecoration: 'none' }}>
                <h2><span>GAE</span>bal<span>SAE</span>bal</h2>
                </Link>
            </div>
            <div className="btn">
            <div className="room">
                <Link to="/room" style={{ textDecoration: 'none' }}>
                    <p>Room</p>
                </Link>
            </div>
            <div className="login">
                <Link to="/login"  style={{ textDecoration: 'none' }}>
                    <p>Login</p>
                </Link>
            </div>
            <div className="logout">
                <a href='http://localhost:8000/logout' style={{ textDecoration: 'none' }}>
                    <p>Logout</p>
                    {/* Logout axios(post 방식, url localhost:8000/logout으로 보내기)로 보낸다음에 then-> isLogin false면 다시 메인페이지로 가게 로직 구현해주세요! */}
                </a>
            </div>
            </div>
        </div>
    );
}
export default Nav;

