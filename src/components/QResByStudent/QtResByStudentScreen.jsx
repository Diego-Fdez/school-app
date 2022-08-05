import './QtResByStudent.css';
import QtResTable from './QtResTable';
import Loader from '../Loader/Loader';
import axiosClient from '../../app/axiosClient';
import { getError } from '../../app/error';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QtResByStudentScreen = () => {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  // function that looks for a student in the DB
  const getResult = async () => {
    try {
      setLoading(true);
      // API is queried
      const result = await axiosClient(`qt-results/${params.studentId}`);
      setLoading(false);
      setStudent(result.data);
      console.log(student);
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${getError(error)}}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      navigate('/');
    }
  };

  useEffect(() => {
    getResult();
  }, [params.id]);

  return (
    <div className='result'>
      <h1>Results per quarter</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className='result-container'>
          <QtResTable key={student.studentId?._id} student={student} />
        </div>
      )}
    </div>
  );
};

export default QtResByStudentScreen;
