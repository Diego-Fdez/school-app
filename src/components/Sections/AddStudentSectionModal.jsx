import axiosClient from '../../app/axiosClient';
import { getError } from '../../app/error';
import {
  selectUser,
  selectSection,
  addStudentSection,
} from '../../slice/basketSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Swal from 'sweetalert2';

const AddStudentSectionModal = ({ hasModal, setHasModal }) => {
  const [section] = useSelector(selectSection);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [studentId, setStudentId] = useState('');

  /**
   * adds a student to a section.
   */
  const addStudent = async () => {
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
      const result = await axiosClient.put(
        `list/add/${section._id}`,
        { studentId },
        configToken
      );
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${result.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(addStudentSection(result.data.student));
      setStudentId('');
      setHasModal(!hasModal);
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
          display: hasModal ? 'flex' : 'none',
        }}
      >
        <div className='modal modal-add-student'>
          {section?._id === '' ? (
            <h1>You must first enter a student ID</h1>
          ) : (
            <>
              <h3>Add Student to sections</h3>
              <div>
                <input
                  type='search'
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
                <button onClick={() => addStudent()}>Add Student</button>
              </div>
            </>
          )}
          <a className='link-2' onClick={() => setHasModal(!hasModal)}></a>
        </div>
      </div>
    </div>
  );
};

export default AddStudentSectionModal;
