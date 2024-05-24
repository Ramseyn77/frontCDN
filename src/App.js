import {BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import './index.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import SearchList from './pages/SearchList';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/search' element={<Search/>} />
        <Route exact path='/search/:word' element={<SearchList/>} />
      </Routes>
    </Router>
  );
}

export default App;
