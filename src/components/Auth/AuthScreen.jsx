import './AuthScreen.css';
import Join from '../../assets/undraw_join.png';
import { useState } from 'react';

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className='auth-container'>
      <div className='auth-l'>
        <div className='circle'></div>
        <img src={Join} alt='Imagen de inicio de sesión' />
      </div>
      <div className='auth-r'>
        <form action='' className='infoForm authForm'>
          <h3>{isSignUp ? 'Sign up' : 'Log In'}</h3>
          {isSignUp && (
            <div>
              <input
                type='text'
                placeholder='First Name'
                className='infoInput'
                name='firstName'
              />
              <input
                type='text'
                placeholder='Last Name'
                className='infoInput'
                name='lastName'
              />
            </div>
          )}
          <div>
            <input
              type='email'
              placeholder='Email'
              className='infoInput'
              name='userName'
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Password'
              className='infoInput'
              name='password'
            />
            {isSignUp && (
              <input
                type='password'
                placeholder='Confirm Password'
                className='infoInput'
                name='confirmPassword'
              />
            )}
          </div>
          {/* <span
            style={{
              display: confirmPass ? 'none' : 'block',
              color: 'red',
              fontSize: '12px',
              alignSelf: 'flex-end',
              marginRight: '5px',
            }}
          >
            * Confirm Password is not same
          </span> */}
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
  );
};

export default AuthScreen;
