import './AddTeacherModal.css';
import { selectUser, addTeacher } from '../../slice/basketSlice';
import axiosClient from '../../app/axiosClient';
import { getError } from '../../app/error';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const TableAddTeacher = ({ teacher, id, setIsOpen }) => {
  /* It's a redux hook that gets the user from the redux store. */
  const user = useSelector(selectUser);
  /* It's a redux hook that gets the dispatch function from the redux store. */
  const dispatch = useDispatch();

  /**
   * I'm trying to add a teacher to a student's list of teachers.
   * @returns The result of the axios request.
   */
  const handleSubmit = async () => {
    try {
      //token validation
      const token = user[0]?.token;
      if (!token) return;

      /* It's a configuration for the token. */
      const configToken = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const result = await axiosClient.put(
        `student/add/${id}`,

        { email: teacher?.email },
        configToken
      );
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${result.data}`,
        showConfirmButton: false,
        timer: 1500,
      });
      /* It's adding the teacher to the student's list of teachers. */
      dispatch(
        addTeacher({
          _id: teacher._id,
          firstName: teacher.firstName,
          userName: teacher.userName,
        })
      );
      setIsOpen(false);
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${getError(error)}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      {teacher.length === 0 ? (
        ''
      ) : (
        <div className='card-container'>
          <div className='card'>
            <div className='box'>
              <div className='content'>
                <h3>{`${teacher?.userName} ${teacher?.firstName}`}</h3>
                <p>Subjects:</p>
                {teacher?.courses.map((courses) => (
                  <span key={courses._id}>{courses.desc}</span>
                ))}
                <div>
                  <button onClick={() => handleSubmit()}>Add Teacher</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableAddTeacher;
