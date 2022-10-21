
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Nav, Login } from './components';
import FaceChat from './components/FaceChat/FaceChat';
import Room from './components/Room/Room';

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/FaceChat" element={<FaceChat />}></Route>
        <Route path='/Room' element={<Room />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

