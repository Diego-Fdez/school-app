import './Quarters.css';
import TableQuarters from './TableQuarters';
import Loader from '../Loader/Loader';
import axiosClient from '../../app/axiosClient';
import { getError } from '../../app/error';
import {
  selectUser,
  quartersInfo,
  selectQuarter,
} from '../../slice/basketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';

const QuartersScreen = ({ createNewQuarter }) => {
  const user = useSelector(selectUser);
  const [quarters] = useSelector(selectQuarter);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  /* Destructuring the useForm hook. */
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  /**
   * The submitHandler function takes in an object with a property of desc, and then calls the
   * createLevels function with the desc property as an argument.
   */
  const submitHandler = ({ desc }) => {
    createNewQuarter({ desc });
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
      const result = await axiosClient('quarter', configToken);
      dispatch(quartersInfo(result?.data));
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
    <div className='quarter-container'>
      <h1>Register a new period</h1>
      {quarters?.length > 0 ? (
        ''
      ) : (
        <div>
          <button onClick={() => handleClick()}>Show all Periods</button>
        </div>
      )}
      <form
        className='infoForm authForm'
        onSubmit={handleSubmit(submitHandler)}
      >
        <fieldset>
          <legend>Period description:</legend>
          <div>
            <input
              type='text'
              placeholder='Period Description'
              className='infoInput'
              name='desc'
              id='desc'
              autoFocus
              {...register('desc', {
                required: 'Please enter the period description',
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
        <>{quarters === undefined ? '' : <TableQuarters />}</>
      )}
    </div>
  );
};

export default QuartersScreen;
