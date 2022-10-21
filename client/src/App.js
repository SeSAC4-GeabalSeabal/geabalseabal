
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Nav } from './components';
import Login from './components/login/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/login" exact element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

