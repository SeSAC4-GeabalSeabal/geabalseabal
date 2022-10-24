import  Nav  from "../nav/Nav";
import Banner from "../banner/Banner";
import Main from "../main/Main";
//import Footer from "../footer/Footer";

function Home( props ) {
  return (
    <>
      <Nav setIsLogin={props.setIsLogin} isLogin={props.isLogin}/>
      <Banner />
      <Main setIsLogin={props.setIsLogin} />
    </>
  );
}

export default Home;