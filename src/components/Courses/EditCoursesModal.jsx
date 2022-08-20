import './CoursesScreen.css';
import axiosClient from '../../app/axiosClient';
import { editCourse, selectUser } from '../../slice/basketSlice';
import { getError } from '../../app/error';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const EditCoursesModal = ({
  openModal,
  setOpenModal,
  id,
  desc,
  setSelectDesc,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  /**
   * It's a function that sends a request to the server to update the course description.
   * @returns The result is an object with the following structure:"
   */
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
      const result = await axiosClient.put(
        `course/${id}`,
        { desc },
        configToken
      );
      setOpenModal(false);
      dispatch(editCourse(result?.data.data));

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${result.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setSelectDesc('');
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
    <div className='dialog-container'>
      <div
        className='modal-container'
        id='m1-o'
        style={{
          background: 'transparent',
          display: openModal ? 'flex' : 'none',
        }}
      >
        <div className='modal courses-modal'>
          <h1>Edit the selected subject</h1>

          <a className='link-2' onClick={() => setOpenModal(!openModal)}></a>
          <div>
            <input
              type='text'
              id='desc'
              name='desc'
              placeholder='Name of the subject'
              defaultValue={desc}
              onChange={(e) => setSelectDesc(e.target.value)}
            />
            <button onClick={() => handleSubmit()}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCoursesModal;
