import CoursesScreen from '../components/Courses/CoursesScreen';
import axiosClient from '../app/axiosClient';
import { selectUser, createCourse } from '../slice/basketSlice';
import { getError } from '../app/error';
import Loader from '../components/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Courses = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  /**
   * It's a function that creates a course in the database.
   * @returns The result of the axiosClient.post is being returned.
   */
  const createCourses = async ({ desc }) => {
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

    try {
      setLoading(true);
      const result = await axiosClient.post('course', { desc }, configToken);
      //console.log({ result });
      dispatch(createCourse(result.data.data));
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${result.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
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

  return (
    <>
      {loading ? <Loader /> : <CoursesScreen createCourses={createCourses} />}
    </>
  );
};

export default Courses;
