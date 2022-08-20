import './Students.css';
import { getError } from '../../app/error';
import axiosClient from '../../app/axiosClient';
import Loader from '../Loader/Loader';
import { selectUser } from '../../slice/basketSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const StudentsTable = () => {
  const user = useSelector(selectUser);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * I'm trying to get the students from the database and set them to the state
   */
  const getStudents = async () => {
    try {
      //token validation
      const token = user[0]?.token;
      if (!token) return;

      //token configuration
      const configToken = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      const res = await axiosClient('student/all', configToken);
      setStudents(res.data);
      setLoading(false);
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

  /* Checking if the user is an admin or teacher. If so, it will call the getStudents function. */
  useEffect(() => {
    if (user[0].userInfo.isAdmin || user[0].userInfo.isTeacher) {
      getStudents();
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {students.map((studentList) => (
            <div className='assists-table' key={studentList._id}>
              <div className='assists-name'>
                <p>ID</p>
                <p>{studentList.studentId}</p>
              </div>
              <div className='assists-present'>
                <p>Name</p>
                <p>{`${studentList.studentName} ${studentList.studentFirstName} ${studentList.studentLastName}`}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default StudentsTable;
