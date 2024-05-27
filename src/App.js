import {BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import './index.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import SearchList from './pages/SearchList';
import Home from './pages/Home';
import SideBar from './components/SideBar';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/sidebar' element={<SideBar/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/search' element={<Search/>} />
        <Route exact path='/search/:word' element={<SearchList/>} />
      </Routes>
    </Router>
  );
}

export default App;
