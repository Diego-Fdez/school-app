import './Teachers.css';
import TableTeacher from './TableTeacher';
import Loader from '../Loader/Loader';
import axiosClient from '../../app/axiosClient';
import { getError } from '../../app/error';
import {
  selectUser,
  teachersInfo,
  selectTeacher,
  selectCourse,
  coursesInfo,
  addCourse,
} from '../../slice/basketSlice';
import resultImage from '../../assets/undraw_Result.png';
import { UilSearch } from '@iconscout/react-unicons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const TeacherScreen = () => {
  const dispatch = useDispatch();
  const [teacher] = useSelector(selectTeacher);
  const user = useSelector(selectUser);
  const [courses] = useSelector(selectCourse);
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * It's a function that gets the courses from the database.
   * @returns The result is an array of objects.
   */
  const getCourses = async () => {
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
      const result = await axiosClient('course', configToken);
      dispatch(coursesInfo(result?.data));
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

  /* It's a hook that runs when the component is mounted. */
  useEffect(() => {
    if (courses === undefined) {
      getCourses();
    }
  }, []);

  // function that looks for a student in the DB
  const handleSubmit = async () => {
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
      // API is queried
      const result = await axiosClient(`auth/teacher/${email}`, configToken);
      // send the data to redux
      dispatch(teachersInfo(result.data));
      setLoading(false);
      setEmail('');
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

  /**
   * It's a function that adds a course to a teacher's profile.
   * @returns The result is a string.
   */
  const handleClick = async () => {
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
        `auth/add/${teacher?._id}`,
        { id },
        configToken
      );
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${result.data}`,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(
        addCourse({
          id: id,
        })
      );
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
    <div className='home-container'>
      <h1>Add or remove subjects to teachers</h1>
      <div className='nav-search'>
        <h5>Get teacher information</h5>
        <div>
          <input
            type='search'
            placeholder='Teacher&#39;s email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <UilSearch type='button' onClick={() => handleSubmit()} />
        </div>
      </div>
      {teacher === undefined ? (
        ''
      ) : (
        <>
          {user[0]?.userInfo.isAdmin ? (
            <div className='teacher-actions'>
              <select
                name='courseDetails'
                id='courseDetails'
                onChange={(e) => setId(e.target.value)}
              >
                <option value=''>--Select Subject--</option>
                {courses?.map((courseDetail) => (
                  <option key={courseDetail._id} value={courseDetail._id}>
                    {courseDetail.desc}
                  </option>
                ))}
              </select>
              <button onClick={() => handleClick()}>Add Subject</button>
            </div>
          ) : (
            ''
          )}
        </>
      )}
      {/* if there is no data, an image is displayed */}
      {teacher === undefined ? (
        <>
          <div className='img-container'>
            <h2>Search teacher by email Here!</h2>
            <img src={resultImage} alt='Result image' />
          </div>
        </>
      ) : (
        // if it is loading, a loader is shown
        <>{loading ? <Loader /> : <TableTeacher />}</>
      )}
    </div>
  );
};

export default TeacherScreen;
