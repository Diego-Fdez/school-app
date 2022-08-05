import './EditStudentModal.css';
import axiosClient from '../../app/axiosClient';
import Loader from '../Loader/Loader';
import { getError } from '../../app/error';
import {
  selectStudent,
  selectUser,
  studentInfo,
} from '../../slice/basketSlice';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const EditStudentModal = ({ display, setDisplay }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [student] = useSelector(selectStudent);
  const [loading, setLoading] = useState(false);

  // the form hook variables are declared
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({
    studentId,
    studentName,
    studentFirstName,
    studentLastName,
    contact,
    observations,
  }) => {
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
      const result = await axiosClient.put(
        'student',
        {
          studentId,
          studentName,
          studentFirstName,
          studentLastName,
          contact,
          observations,
        },
        configToken
      );
      dispatch(studentInfo(result.data.student));
      setDisplay(!display);
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
      {loading ? (
        <Loader />
      ) : (
        <div className='dialog-container'>
          <div
            className='modal-container'
            id='m1-o'
            style={{
              background: 'transparent',
              display: display ? 'flex' : 'none',
            }}
          >
            <div className='modal'>
              {student?._id === '' ? (
                <h1>You must first enter a student ID</h1>
              ) : (
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className='infoForm authForm'
                >
                  <h1>Edit student</h1>
                  <div>
                    <input
                      type='number'
                      placeholder='Identification Number'
                      className='infoInput'
                      name='studentId'
                      id='studentId'
                      onChange={(e) => setStudentId(e.target.value)}
                      {...register('studentId', {
                        required: 'Please enter the student ID',
                      })}
                      defaultValue={student?.studentId}
                    />
                    {/* react hook forms errors */}
                    {errors.studentId && (
                      <span className='text-error'>
                        {errors.studentId.message}
                      </span>
                    )}
                    <input
                      type='text'
                      placeholder='Student Name'
                      className='infoInput'
                      name='studentName'
                      id='studentName'
                      {...register('studentName', {
                        required: 'Please enter the student name',
                      })}
                      defaultValue={student?.studentName}
                    />
                    {/* react hook forms errors */}
                    {errors.studentName && (
                      <span className='text-error'>
                        {errors.studentName.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      type='text'
                      placeholder='First Name'
                      className='infoInput'
                      name='studentFirstName'
                      id='studentFirstName'
                      {...register('studentFirstName', {
                        required: 'Please enter the first name',
                      })}
                      defaultValue={student?.studentFirstName}
                    />
                    {/* react hook forms errors */}
                    {errors.studentFirstName && (
                      <span className='text-error'>
                        {errors.studentFirstName.message}
                      </span>
                    )}
                    <input
                      type='text'
                      placeholder='Last Name'
                      className='infoInput'
                      name='studentLastName'
                      id='studentLastName'
                      {...register('studentLastName', {
                        required: 'Please enter the last name',
                      })}
                      defaultValue={student?.studentLastName}
                    />
                    {/* react hook forms errors */}
                    {errors.studentLastName && (
                      <span className='text-error'>
                        {errors.studentLastName.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      type='text'
                      className='infoInput'
                      placeholder='Contact'
                      name='contact'
                      id='contact'
                      {...register('contact')}
                      defaultValue={student?.contact}
                    />
                  </div>
                  <div>
                    <textarea
                      type='number'
                      placeholder='Observations'
                      className='infoInput'
                      name='observations'
                      id='observations'
                      {...register('observations')}
                      defaultValue={student?.observations}
                    />
                  </div>
                  <button className='infoButton h-button' type='submit'>
                    Update
                  </button>
                </form>
              )}
              <a className='link-2' onClick={() => setDisplay(!display)}></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditStudentModal;
