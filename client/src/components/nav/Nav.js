import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
    return(
        <div className="container">
            <h2><span>GAE</span>bal<span>SAE</span>bal</h2>
            <div className="login">
                <Link to="/login" exact activeClassName="selected">
                    <p>Login</p>
                </Link>
            </div>
        </div>
    );
}
export default Nav;

