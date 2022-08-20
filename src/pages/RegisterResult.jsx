import '../components/RegisterResultScreen/RegisterResult.css';
import RegisterResultScreen from '../components/RegisterResultScreen/RegisterResultScreen';
import { getError } from '../app/error';
import axiosClient from '../app/axiosClient';
import Loader from '../components/Loader/Loader';
import { selectStudent, studentInfo } from '../slice/basketSlice';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { UilSearch } from '@iconscout/react-unicons';

const RegisterResult = () => {
  const dispatch = useDispatch();
  const [student] = useSelector(selectStudent);
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);

  // function that looks for a student in the DB
  const handleSubmit = async () => {
    try {
      setLoading(true);
      // API is queried
      const result = await axiosClient(`student/student/${studentId}`);
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
    <>
      <div>
        <h1>Record results</h1>
      </div>
      <div className='nav-search'>
        <h5>Get student:</h5>
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
      {student === undefined ? (
        <div className='result-message'>
          <h2>Select a Student</h2>
        </div>
      ) : (
        <>{loading ? <Loader /> : <RegisterResultScreen />}</>
      )}
    </>
  );
};

export default RegisterResult;
