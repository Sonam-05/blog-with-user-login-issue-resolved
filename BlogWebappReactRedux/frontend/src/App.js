import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostFormWithPosts from './components/PostFormWithPosts';
import SinglePost from './pages/SinglePost';
import Register from './client/Register';
import Login from './client/Login';
import SearchPosts from './pages/SearchPosts';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* routes */}
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />

          <Route exact path='/' element={<PostFormWithPosts />} />
          <Route exact path='/single-post/:id' element={<SinglePost />} />
          <Route exact path='/search/:keyword' element={<SearchPosts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
