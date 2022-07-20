import './App.css';
import Nav from './components/NavBar/Nav';
import Auth from './pages/Auth';
import Home from './pages/Home';
import CreateNotes from './pages/CreateNotes';
import Homeworks from './pages/Homeworks';
import Assists from './pages/Assists';
import CreateStudent from './pages/CreateStudent';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <div className='blur b-1'></div>
      <div className='blur b-2'></div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='auth' element={<Auth />} />
          <Route path='/' element={<Home />} />
          <Route path='create-notes' element={<CreateNotes />} />
          <Route path='homeworks' element={<Homeworks />} />
          <Route path='create-student' element={<CreateStudent />} />
          <Route path='assists' element={<Assists />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
