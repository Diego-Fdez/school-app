import '../components/QResByStudent/QtResByStudent.css';
import QtResTable from '../components/QResByStudent/QtResTable';
import Loader from '../components/Loader/Loader';
import axiosClient from '../app/axiosClient';
import { getError } from '../app/error';
import { qtResultInfo, selectQtResult } from '../slice/basketSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QtResByStudent = () => {
  const dispatch = useDispatch();
  const [qtResults] = useSelector(selectQtResult);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  // function that looks for a student in the DB
  const getResult = async () => {
    try {
      setLoading(true);
      // API is queried
      const result = await axiosClient(`qt-results/${params?.studentId}`);
      setLoading(false);
      dispatch(qtResultInfo(result.data));
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
    if (qtResults === undefined) {
      getResult();
    }
  }, [qtResults]);

  return (
    <>
      <div className='result'>
        <h1>Results per period</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className='result-container'>
            <QtResTable />
          </div>
        )}
      </div>
    </>
  );
};

export default QtResByStudent;
