
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Nav, Login } from './components';
import FaceChat from './components/FaceChat/FaceChat';
import Room from './components/Room/Room';
import Home from './components/home/Home';
// import Chat from './components/Chat/Chat';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/FaceChat" element={<FaceChat />}></Route>
        <Route path='/Room' element={<Room />}></Route>
        {/* <Route path='/chat' element={<Chat />}></Route> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;

