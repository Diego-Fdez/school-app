import './AuthScreen.css';
import Join from '../../assets/undraw_join.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { teacherInfo } from '../../slice/basketSlice';
import axiosClient from '../../app/axiosClient';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Loader from '../Loader/Loader';

const AuthScreen = () => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // the form hook variables are declared
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch('password');

  //form submit
  const submitHandler = async ({ email, password, userName, firstName }) => {
    try {
      // function that registers the user
      if (isSignUp) {
        setLoading(true);
        // data is sent to the DB
        await axiosClient.post('auth/register', {
          firstName,
          userName,
          email,
          password,
        });
        setIsSignUp(false);
        setLoading(false);
      } else {
        // function that log in the user
        setLoading(true);
        // data is sent to the DB
        const { data } = await axiosClient.post('auth/login', {
          email,
          password,
        });
        dispatch(teacherInfo(data));
        setLoading(false);
        navigate('/');
      }
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        // if it is loading, a loader is shown
        <Loader />
      ) : (
        <div className='auth-container'>
          <div className='auth-l'>
            <div className='circle'></div>
            <img src={Join} alt='Imagen de inicio de sesión' />
          </div>
          <div className='auth-r'>
            <form
              className='infoForm authForm'
              onSubmit={handleSubmit(submitHandler)}
            >
              <h3>{isSignUp ? 'Sign up' : 'Log In'}</h3>
              {isSignUp && (
                <div>
                  <input
                    type='text'
                    placeholder='Name'
                    className='infoInput'
                    name='userName'
                    id='userName'
                    autoFocus
                    {...register('userName', {
                      required: 'Please enter your name',
                      minLength: {
                        value: 4,
                        message: 'The name must have at least 4 characters',
                      },
                      maxLength: {
                        value: 12,
                        message:
                          'The name must have a maximum of 12 characters',
                      },
                    })}
                  />
                  {/* react hook forms errors */}
                  {errors.userName && (
                    <span className='text-error'>
                      {errors.userName.message}
                    </span>
                  )}
                  <input
                    type='text'
                    placeholder='First Name'
                    className='infoInput'
                    name='firstName'
                    id='firstName'
                    {...register('firstName', {
                      required: 'Please enter your first name',
                      minLength: {
                        value: 4,
                        message: 'The name must have at least 4 characters',
                      },
                      maxLength: {
                        value: 12,
                        message:
                          'The name must have a maximum of 12 characters',
                      },
                    })}
                  />
                  {/* react hook forms errors */}
                  {errors.firstName && (
                    <span className='text-error'>
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
              )}
              <div>
                <input
                  type='email'
                  placeholder='Email'
                  className='infoInput'
                  name='email'
                  id='email'
                  {...register('email', {
                    required: 'Please enter an email',
                    pattern: {
                      value:
                        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                      message: 'Please enter a valid email',
                    },
                  })}
                />
                {/* react hook forms errors */}
                {errors.email && (
                  <span className='text-error'>{errors.email.message}</span>
                )}
              </div>
              <div>
                <input
                  type='password'
                  placeholder='Password'
                  className='infoInput'
                  name='password'
                  id='password'
                  {...register('password', {
                    required: 'Please enter a password',
                    minLength: {
                      value: 5,
                      message: 'The password must be at least 5 characters',
                    },
                  })}
                />
                {/* react hook forms errors */}
                {errors.password && (
                  <span className='text-error'>{errors.password.message}</span>
                )}
                {isSignUp && (
                  <input
                    type='password'
                    placeholder='Confirm Password'
                    className='infoInput'
                    name='confirmPassword'
                    id='confirmPassword'
                    {...register('confirmPassword', {
                      required: 'Por favor confirme la contraseña',
                      validate: (value) =>
                        value === password || 'Las contraseñas no coinciden',
                    })}
                  />
                )}
                {errors.confirmPassword && (
                  <span className='text-error'>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <div>
                <span
                  style={{ fontSize: '12px', cursor: 'pointer' }}
                  onClick={() => {
                    setIsSignUp((prev) => !prev);
                  }}
                >
                  {isSignUp
                    ? 'Already have an account. Login!'
                    : `Don't have an account? Sign up!`}
                </span>
              </div>
              <button className='infoButton' type='submit'>
                {isSignUp ? 'Signup' : 'Log In'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthScreen;
