import  Nav  from "../nav/Nav";
import Banner from "../banner/Banner";
import Main from "../main/Main";
//import Footer from "../footer/Footer";

function Home( props ) {
  return (
    <>
      <Banner />
      <Main setIsLogin={props.setIsLogin} />
    </>
  );
}

export default Home;