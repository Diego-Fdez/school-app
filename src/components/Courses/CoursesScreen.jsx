import './CoursesScreen.css';
import TableCourses from './TableCourses';
import axiosClient from '../../app/axiosClient';
import Loader from '../Loader/Loader';
import { selectUser, coursesInfo, selectCourse } from '../../slice/basketSlice';
import { getError } from '../../app/error';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const CoursesScreen = ({ createCourses }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [courses] = useSelector(selectCourse);
  const [loading, setLoading] = useState(false);

  /* Destructuring the useForm hook. */
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  /**
   * The submitHandler function takes a parameter called desc and calls the createCourse function with
   * the desc parameter.
   */
  const submitHandler = ({ desc }) => {
    createCourses({ desc });
  };

  /**
   * It's a function that makes a request to the backend and returns a response.
   * </code>
   * @returns The result is an array of objects.
   */
  const handleClick = async () => {
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

    try {
      setLoading(true);
      const result = await axiosClient('course', configToken);
      dispatch(coursesInfo(result?.data));
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
    <div className='courses-container'>
      <h1>Register a new Course</h1>
      <div>
        {/* It's a ternary operator that checks if the courses array has a length greater than 0, if it
        is, it will not display anything, if it is not, it will display the button. */}
        {courses?.length > 0 ? (
          ''
        ) : (
          <button onClick={() => handleClick()}>Show all courses</button>
        )}
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className='infoForm authForm'
      >
        <fieldset>
          <legend>Course name:</legend>
          <div>
            <input
              type='text'
              placeholder='Course Name'
              className='infoInput'
              name='desc'
              id='desc'
              autoFocus
              {...register('desc', {
                required: 'Please enter the course name',
              })}
            />
            {/* Checking if there is an error in the form, and if there is, it will display the error
            message. */}
            {errors.desc && (
              <span className='text-error'>{errors.desc.message}</span>
            )}
          </div>
          <button className='infoButton h-button' type='submit'>
            Save
          </button>
        </fieldset>
      </form>
      {loading ? (
        <Loader />
      ) : (
        <>{courses === undefined ? '' : <TableCourses />}</>
      )}
    </div>
  );
};

export default CoursesScreen;
