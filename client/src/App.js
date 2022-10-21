
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Nav } from './components';
import './App.css';
import Login from './components/login/Login';
import FaceChat from './components/FaceChat/FaceChat';

const App = () => {
  return (
    <BrowserRouter>
    <div className="app">
      <Nav />
      <div>
      <Routes>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/FaceChat" exact element={<FaceChat />}></Route>
      </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}
export default App;

