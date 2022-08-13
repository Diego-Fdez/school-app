import './HomeScreen.css';
import TableScreen from './TableScreen';
import Loader from '../Loader/Loader';
import EditStudentModal from '../EditStudentModal/EditStudentModal';
import AddTeacherModal from '../AddTeacherModal/AddTeacherModal';
import { getError } from '../../app/error';
import { UilSearch } from '@iconscout/react-unicons';
import resultImage from '../../assets/undraw_Result.png';
import axiosClient from '../../app/axiosClient';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  studentInfo,
  selectStudent,
  selectUser,
} from '../../slice/basketSlice';
import Swal from 'sweetalert2';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const student = useSelector(selectStudent);
  const user = useSelector(selectUser);
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // function that looks for a student in the DB
  const handleSubmit = async () => {
    try {
      setLoading(true);
      // API is queried
      const result = await axiosClient(`student/${studentId}`);
      // send the data to redux
      dispatch(studentInfo(result.data));
      setLoading(false);
      setStudentId('');
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${getError(error)}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    }
  };

  return (
    <div className='home-container'>
      <EditStudentModal display={display} setDisplay={setDisplay} />
      <AddTeacherModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <h1>Grades</h1>
      <div className='nav-search'>
        <h5>Get student averages</h5>
        <div>
          <input
            type='search'
            placeholder='Identification number'
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <UilSearch type='button' onClick={() => handleSubmit()} />
        </div>
        {user[0]?.userInfo.isAdmin ? (
          <div className='home-actions'>
            <button onClick={() => setDisplay(!display)}>
              <a>Edit Student</a>
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>Add Teacher</button>
          </div>
        ) : (
          ''
        )}
      </div>
      {/* if there is no data, an image is displayed */}
      {student.length === 0 ? (
        <>
          <div className='img-container'>
            <h2>Search student by ID Here!</h2>
            <img src={resultImage} alt='Result image' />
          </div>
        </>
      ) : (
        // if it is loading, a loader is shown
        <>{loading ? <Loader /> : <TableScreen />}</>
      )}
    </div>
  );
};

export default HomeScreen;
