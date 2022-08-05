import './App.css';
import Nav from './components/NavBar/Nav';
import Auth from './pages/Auth';
import Home from './pages/Home';
import CreateNotes from './pages/CreateNotes';
import Assists from './pages/Assists';
import CreateStudent from './pages/CreateStudent';
import Panel from './pages/Panel';
import QtResByStudent from './pages/QtResByStudent';
import Courses from './pages/Courses';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <div className='blur b-1'></div>
      <div className='blur b-2'></div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='auth' element={<Auth />} />
          <Route path='create-notes' element={<CreateNotes />} />
          <Route path='create-student' element={<CreateStudent />} />
          <Route path='courses' element={<Courses />} />
          <Route path='assists' element={<Assists />} />
          <Route path='panel' element={<Panel />} />
          <Route
            path='results-student/:studentId'
            element={<QtResByStudent />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
