import './RegisterResult.css';
import { getError } from '../../app/error';
import axiosClient from '../../app/axiosClient';
import {
  selectCourse,
  selectLevel,
  selectQuarter,
  selectStudent,
  selectUser,
  coursesInfo,
  levelsInfo,
  quartersInfo,
  createQuarterResult,
  editLQtResult,
} from '../../slice/basketSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const RegisterResultScreen = ({ modal, quarterSelected }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [courses] = useSelector(selectCourse);
  const [levels] = useSelector(selectLevel);
  const [quarters] = useSelector(selectQuarter);
  const [student] = useSelector(selectStudent);
  const [loading, setLoading] = useState(false);

  // the form hook variables are declared
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

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
    }
  };

  /**
   * It's a function that gets the levels of a user.
   * @returns The result is an array of objects.
   */
  const getLevels = async () => {
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
      const result = await axiosClient('levels', configToken);
      dispatch(levelsInfo(result?.data));
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

  /**
   * It's a function that gets the quarters from the database.
   */
  const getQuarters = async () => {
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
      const result = await axiosClient('quarter', configToken);
      dispatch(quartersInfo(result?.data));
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

  /* It's a hook that is executed when the component is mounted. */
  useEffect(() => {
    if (
      courses === undefined ||
      levels === undefined ||
      quarters === undefined
    ) {
      getCourses();
      getLevels();
      getQuarters();
    }
  }, []);

  /**
   * It sends a POST request to the server with the data entered in the form.
   * @returns The result of the query is returned.
   */
  const registerResult = async ({
    course,
    level,
    quarter,
    test1,
    perTest1,
    test2,
    perTest2,
    assists,
    homework,
  }) => {
    const data = {
      studentId: student._id,
      course,
      quarter,
      test1,
      perTest1,
      test2,
      perTest2,
      assists,
      homework,
      level,
    };

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
      // API is queried
      if (modal) {
        const result = await axiosClient.put(
          `qt-results/${quarterSelected._id}`,
          data,
          configToken
        );
        dispatch(editLQtResult(result.data.result));
        console.log(result.data.result);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${result.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const result = await axiosClient.post(
          'qt-results/register',
          data,
          configToken
        );
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${result.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(createQuarterResult(result.data.data));
      }

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
    <div className='student-container'>
      <form
        onSubmit={handleSubmit(registerResult)}
        className='infoForm register-result-form'
      >
        <div>
          <span>Student: </span>
          <h3>
            {`${student?.studentName} ${student?.studentFirstName} ${student?.studentLastName}`}
          </h3>
        </div>
        <div>
          <select
            name='course'
            id='course'
            defaultValue={modal ? quarterSelected?.course?._id : ''}
            {...register('course', {
              required: 'Please select a subject',
            })}
          >
            <option value='' disabled>
              --Select Subject--
            </option>
            {courses?.map((course) => (
              <option
                key={course._id}
                value={course._id}
                defaultValue={quarterSelected?.course?._id === course._id}
              >
                {course.desc}
              </option>
            ))}
          </select>
          {/* react hook forms errors */}
          {errors.course && (
            <span className='text-error'>{errors.course.message}</span>
          )}
          <select
            name='quarter'
            id='quarter'
            defaultValue={modal ? quarterSelected?.quarter?._id : ''}
            {...register('quarter', {
              required: 'Please select a period',
            })}
          >
            <option value=''>--Select Period--</option>
            {quarters?.map((quarter) => (
              <option
                key={quarter._id}
                value={quarter._id}
                defaultValue={quarterSelected?.quarter?._id === quarter._id}
              >
                {quarter.desc}
              </option>
            ))}
          </select>
          {/* react hook forms errors */}
          {errors.quarter && (
            <span className='text-error'>{errors.quarter.message}</span>
          )}
        </div>
        <div>
          <input
            type='number'
            className='infoInput'
            placeholder='first period score'
            name='test1'
            id='test1'
            {...register('test1')}
            defaultValue={modal ? quarterSelected?.test1 : ''}
          />
          <input
            type='number'
            className='infoInput'
            placeholder='Percentage of the first period'
            name='perTest1'
            id='perTest1'
            {...register('perTest1')}
            defaultValue={modal ? quarterSelected?.perTest1 : ''}
          />
        </div>
        <div>
          <input
            type='number'
            className='infoInput'
            placeholder='Second period score'
            name='test2'
            id='test2'
            {...register('test2')}
            defaultValue={modal ? quarterSelected?.test2 : ''}
          />
          <input
            type='number'
            className='infoInput'
            placeholder='Percentage of the first period'
            name='perTest2'
            id='perTest2'
            {...register('perTest2')}
            defaultValue={modal ? quarterSelected?.perTest2 : ''}
          />
        </div>
        <div>
          <input
            type='number'
            className='infoInput'
            placeholder='Assists'
            name='assists'
            id='assists'
            {...register('assists')}
            defaultValue={modal ? quarterSelected?.assists : ''}
          />
          <input
            type='number'
            className='infoInput'
            placeholder='Homework'
            name='homework'
            id='homework'
            {...register('homework')}
            defaultValue={modal ? quarterSelected?.homework : ''}
          />
        </div>
        <div>
          <select
            name='level'
            id='level'
            defaultValue={modal ? quarterSelected?.level?._id : ''}
            {...register('level')}
          >
            <option value=''>--Select Level--</option>
            {levels?.map((level) => (
              <option
                key={level._id}
                value={level._id}
                defaultValue={quarterSelected?.level?._id === level._id}
              >
                {level.desc}
              </option>
            ))}
          </select>
          <button className='infoButton h-button' type='submit'>
            {modal ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterResultScreen;
