import { Link } from 'react-router-dom';
import Main11 from '../img/Main11.jpg';
import "./Banner.scss";

const Banner = () => {
    return (
      <>
        <div className="banner">
            <img src={Main11} alt="img" />
            <div className="banner-text">
                <h1>A better way for your remote team to</h1>
                <p>Cowork togehter</p>
                <div className="room">
                <Link to="/room" style={{ textDecoration: 'none' }}>
                <h2>Room</h2>
                </Link>
                </div>
            </div>
        </div>
    </>
    );
}

export default Banner;