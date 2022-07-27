import './QtResByStudent.css';
import QtResTable from './QtResTable';
import Loader from '../Loader/Loader';
import axiosClient from '../../app/axiosClient';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QtResByStudentScreen = () => {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState([]);
  const params = useParams();
  console.log(params.studentId);
  // function that looks for a student in the DB
  const getResult = async () => {
    try {
      setLoading(true);
      // API is queried
      const result = await axiosClient(`qt-results/${params.studentId}`);
      setLoading(false);
      setStudent(result.data);
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
