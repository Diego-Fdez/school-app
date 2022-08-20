import './App.css';
import Nav from './components/NavBar/Nav';
import Auth from './pages/Auth';
import Home from './pages/Home';
import CreateStudent from './pages/CreateStudent';
import Panel from './pages/Panel';
import QtResByStudent from './pages/QtResByStudent';
import Courses from './pages/Courses';
import Level from './pages/Level';
import Quarters from './pages/Quarters';
import Teachers from './pages/Teachers';
import RegisterResult from './pages/RegisterResult';
import Section from './pages/Section';
import Students from './pages/Students';
import TeacherList from './pages/TeacherList';
import { selectUser } from './slice/basketSlice';
import { useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function App() {
  const user = useSelector(selectUser);

  return (
    <div className='App'>
      <div className='blur b-1'></div>
      <div className='blur b-2'></div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='auth' element={<Auth />} />
          <Route
            path='create-student'
            element={
              user[0]?.userInfo?.isAdmin ? (
                <CreateStudent />
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            path='courses'
            element={
              user[0]?.userInfo?.isAdmin ? <Courses /> : <Navigate to='/' />
            }
          />
          <Route
            path='panel'
            element={
              user[0]?.userInfo?.isAdmin || user[0]?.userInfo?.isTeacher ? (
                <Panel />
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            path='levels'
            element={
              user[0]?.userInfo?.isAdmin ? <Level /> : <Navigate to='/' />
            }
          />
          <Route
            path='quarters'
            element={
              user[0]?.userInfo?.isAdmin ? <Quarters /> : <Navigate to='/' />
            }
          />
          <Route
            path='teacher'
            element={
              user[0]?.userInfo?.isAdmin ? <Teachers /> : <Navigate to='/' />
            }
          />
          <Route
            path='teachers'
            element={
              user[0]?.userInfo?.isAdmin ? <TeacherList /> : <Navigate to='/' />
            }
          />
          <Route
            path='results-student'
            element={
              user[0]?.userInfo?.isAdmin || user[0]?.userInfo?.isTeacher ? (
                <RegisterResult />
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            path='students'
            element={
              user[0]?.userInfo?.isAdmin || user[0]?.userInfo?.isTeacher ? (
                <Students />
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            path='sections'
            element={
              user[0]?.userInfo?.isAdmin ? <Section /> : <Navigate to='/' />
            }
          />
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
