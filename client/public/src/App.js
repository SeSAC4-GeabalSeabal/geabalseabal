
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Nav } from './components';
import './App.css';
import Login from './components/login/Login';

const App = () => {
  return (
    <BrowserRouter>
    <div className="app">
      <Nav />
      <div>
      <Routes>
        <Route path="/login" exact element={<Login />}></Route>
      </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}
export default App;

