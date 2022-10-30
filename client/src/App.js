import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav, Login } from "./components";
import Room from "./components/Room/Room";
import Home from "./components/home/Home";
// import Chat from './components/Chat/Chat';
import Footer from "./components/footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Nav setIsLogin={setIsLogin} isLogin={isLogin} />
      <Routes>
        <Route path="/" element={<Home setIsLogin={setIsLogin} isLogin={isLogin} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Room" element={<Room />}></Route>
        {/* <Route path='/chat' element={<Chat />}></Route> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
