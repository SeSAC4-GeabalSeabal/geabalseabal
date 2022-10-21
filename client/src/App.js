
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Nav } from './components';
import Login from './components/login/Login';
import FaceChat from './components/FaceChat/FaceChat';

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/facechat" exact element={<FaceChat />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/FaceChat" exact element={<FaceChat />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

