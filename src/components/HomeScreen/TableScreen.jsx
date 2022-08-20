import './HomeScreen.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectStudent,
  selectUser,
  removeTeacher,
} from '../../slice/basketSlice';
import { getError } from '../../app/error';
import axiosClient from '../../app/axiosClient';
import { Link } from 'react-router-dom';
import { UilTimesCircle } from '@iconscout/react-unicons';
import Swal from 'sweetalert2';

const TableScreen = () => {
  const dispatch = useDispatch();
  const [student] = useSelector(selectStudent);
  const user = useSelector(selectUser);

  /**
   * If the user confirms the delete, then call the handleSubmit function with the id of the teacher to
   * delete.
   */
  const confirmDeleteTeacher = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit(id);
      }
    });
  };

  /**
   * I'm trying to delete a teacher from the database using the id of the student.
   * @returns The id of the student that was deleted.
   */
  const handleSubmit = async (id) => {
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
      const res = await axiosClient.put(
        `student/delete/${student._id}`,
        { id },
        configToken
      );
      Swal.fire('Deleted!', `${res.data}`, 'success');
      dispatch(removeTeacher(id));
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
      <div className='card-container'>
        <div className='card'>
          <div className='box'>
            <div className='content'>
              <h2>{student?.studentId}</h2>
              <h3>{`${student?.studentName} ${student?.studentFirstName} ${student?.studentLastName}`}</h3>
              <p>
                Contact: <span>{student?.contact}</span>
              </p>
              <p>Assigned Teachers:</p>
              {student?.teachers?.map((teacher) => (
                <span key={teacher?._id}>
                  {`${teacher?.userName} ${teacher?.firstName}`}{' '}
                  {user[0]?.userInfo.isAdmin ? (
                    <UilTimesCircle
                      onClick={() => confirmDeleteTeacher(teacher?._id)}
                    />
                  ) : (
                    ''
                  )}
                </span>
              ))}
              <div>
                <Link to={`results-student/${student._id}`}>See scores</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableScreen;
