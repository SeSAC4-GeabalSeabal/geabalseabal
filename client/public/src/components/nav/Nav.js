import { NavLink } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
    return(
        <div className="nav">
            <div className="container">
                <header>gaebalsaebal</header>
                <nav>
                    <NavLink to="/login" exact activeClassName="selected">
                        <span>Login</span>
                    </NavLink>
                </nav>
            </div>
        </div>
    );
}
export default Nav;

