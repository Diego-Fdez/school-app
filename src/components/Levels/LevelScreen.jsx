import './LevelScreen.css';
import TableLevels from './TableLevels';
import Loader from '../Loader/Loader';
import axiosClient from '../../app/axiosClient';
import { selectUser, levelsInfo, selectLevel } from '../../slice/basketSlice';
import { getError } from '../../app/error';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';

const LevelScreen = ({ createLevels }) => {
  const user = useSelector(selectUser);
  const [levels] = useSelector(selectLevel);
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
    createLevels({ desc });
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
      const result = await axiosClient('levels', configToken);
      dispatch(levelsInfo(result?.data));
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
    <div className='levels-container'>
      <h1>Register a new level</h1>
      {levels?.length > 0 ? (
        ''
      ) : (
        <div>
          <button onClick={() => handleClick()}>Show all levels</button>
        </div>
      )}
      <form
        className='infoForm authForm'
        onSubmit={handleSubmit(submitHandler)}
      >
        <fieldset>
          <legend>Level description:</legend>
          <div>
            <input
              type='text'
              placeholder='Level Description'
              className='infoInput'
              name='desc'
              id='desc'
              autoFocus
              {...register('desc', {
                required: 'Please enter the level description',
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
        <>{levels === undefined ? '' : <TableLevels />}</>
      )}
    </div>
  );
};

export default LevelScreen;
