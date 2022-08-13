import QuartersScreen from '../components/Quarters/QuartersScreen';
import axiosClient from '../app/axiosClient';
import { createQuarter, selectUser } from '../slice/basketSlice';
import { getError } from '../app/error';
import Loader from '../components/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useState } from 'react';

const Quarters = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  /**
   * It's a function that creates a quarter and returns a message if the quarter was created successfully
   * or not.
   */
  const createNewQuarter = async ({ desc }) => {
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
      const result = await axiosClient.post('quarter', { desc }, configToken);
      dispatch(createQuarter(result.data.data));
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
        <QuartersScreen createNewQuarter={createNewQuarter} />
      )}
    </>
  );
};

export default Quarters;
