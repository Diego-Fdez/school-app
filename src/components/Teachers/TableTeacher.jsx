import { getError } from '../../app/error';
import axiosClient from '../../app/axiosClient';
import {
  selectTeacher,
  selectUser,
  deleteCourse,
} from '../../slice/basketSlice';
import { useSelector, useDispatch } from 'react-redux';
import { UilTimesCircle } from '@iconscout/react-unicons';
import Swal from 'sweetalert2';

const TableTeacher = () => {
  const dispatch = useDispatch();
  const [teacher] = useSelector(selectTeacher);
  const user = useSelector(selectUser);

  /**
   * If the user confirms the delete, then call the handleSubmit function with the id of the course to
   * delete.
   */
  const confirmDeleteCourse = async (id) => {
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
   * I'm trying to delete a course from the database, but I'm getting an error.
   * @returns The course is being deleted from the database and the course is being deleted from the
   * state.
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
        `auth/delete/${teacher._id}`,
        { id },
        configToken
      );
      Swal.fire('Deleted!', `${res.data}`, 'success');
      dispatch(deleteCourse(id));
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
              <h3>{`${teacher?.userName} ${teacher?.firstName}`}</h3>
              <p>{teacher?.email}</p>
              <p>Assigned subjects:</p>
              {teacher?.courses?.map((course) => (
                <span key={course?._id}>
                  {`${course?.desc}`}{' '}
                  {user[0]?.userInfo.isAdmin ? (
                    <UilTimesCircle
                      onClick={() => confirmDeleteCourse(course?._id)}
                    />
                  ) : (
                    ''
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableTeacher;
