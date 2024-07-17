import {BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import './index.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import SearchList from './pages/SearchList';
import Home from './pages/Home';
import Articles from './pages/Articles';
import List from './pages/List';
import AddArticle from './pages/AddArticle';
import Article from './pages/Article';
import Quiz from './pages/Quiz';
import About from './pages/About';
import Profil from './pages/Profil';
import PageNotFound from './pages/PageNotFound';
import VerifyEmail from './pages/VerifyEmail';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/emailVerify/:id' element={<VerifyEmail/>} />
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/about' element={<About/>} />
        <Route exact path='/profil' element={<Profil/>} />
        <Route exact path='/quiz' element={<Quiz/>} />
        <Route exact path='/add' element={<AddArticle/>} />
        <Route exact path='/articles' element={<Articles/>} />
        <Route exact path='/articles/:type/:id' element={<List/>} />
        <Route exact path='/search/:word' element={<SearchList/>} />
        <Route exact path='/articles/show/:id' element={<Article/>} />
        <Route exact path='/search' element={<Search/>} />
        <Route exact path='/notFound' element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
