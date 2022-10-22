
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Nav, Login } from './components';
import FaceChat from './components/FaceChat/FaceChat';
import Room from './components/Room/Room';
import Home from './components/home/Home';
import Chat from './components/Chat/Chat';

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Home />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/FaceChat" element={<FaceChat />}></Route>
        <Route path='/Room' element={<Room />}></Route>
        <Route path='/Chat' element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

