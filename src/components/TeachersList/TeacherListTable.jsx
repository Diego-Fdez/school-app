import '../Students/Students.css';
import { getError } from '../../app/error';
import axiosClient from '../../app/axiosClient';
import { selectUser } from '../../slice/basketSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Loader from '../Loader/Loader';

const TeacherListTable = () => {
  const user = useSelector(selectUser);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * It gets all the students from the database and sets them to the state.
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
      const res = await axiosClient('auth/all', configToken);
      setTeachers(res.data);
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

  /* Checking if the user is an admin or a teacher. If it is, it will call the getStudents function. */
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
          {teachers.map((teacher) => (
            <div className='assists-table' key={teacher._id}>
              <div className='assists-name'>
                <p>Email</p>
                <p>{teacher.email}</p>
              </div>
              <div className='assists-present'>
                <p>Name</p>
                <p>{`${teacher.userName} ${teacher.firstName}`}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default TeacherListTable;
