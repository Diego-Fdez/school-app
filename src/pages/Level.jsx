import LevelScreen from '../components/Levels/LevelScreen';
import axiosClient from '../app/axiosClient';
import { selectUser, createLevel } from '../slice/basketSlice';
import { getError } from '../app/error';
import Loader from '../components/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useState } from 'react';

const Level = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  /**
   * It's a function that creates a course and returns a message if the level was created successfully
   * or not.
   */
  const createLevels = async ({ desc }) => {
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
      const result = await axiosClient.post('levels', { desc }, configToken);
      dispatch(createLevel(result.data.data));
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
    <>{loading ? <Loader /> : <LevelScreen createLevels={createLevels} />}</>
  );
};

export default Level;
