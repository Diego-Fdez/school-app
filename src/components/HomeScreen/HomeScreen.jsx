import './HomeScreen.css';
import TableScreen from './TableScreen';
import Loader from '../Loader/Loader';
import { UilSearch } from '@iconscout/react-unicons';
import resultImage from '../../assets/undraw_Result.png';
import axiosClient from '../../app/axiosClient';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { studentInfo, selectStudent } from '../../slice/basketSlice';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const student = useSelector(selectStudent);
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);

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
        title: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className='home-container'>
      <h1>Promedios</h1>
      <div className='nav-search'>
        <h5>Obtenga los promedios del estudiante</h5>
        <div>
          <input
            type='search'
            placeholder='Identification number'
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <UilSearch type='button' onClick={() => handleSubmit()} />
        </div>
      </div>
      {/* if there is no data, an image is displayed */}
      {student.length === 0 ? (
        <div className='img-container'>
          <h2>Search student by ID Here!</h2>
          <img src={resultImage} alt='Result image' />
        </div>
      ) : (
        // if it is loading, a loader is shown
        <>{loading ? <Loader /> : <TableScreen />}</>
      )}
    </div>
  );
};

export default HomeScreen;
