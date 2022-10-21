import { Link } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
    return(
        <div className="container">
            <h2><span>GAE</span>bal<span>SAE</span>bal</h2>
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
        </div>
    );
}
export default Nav;

