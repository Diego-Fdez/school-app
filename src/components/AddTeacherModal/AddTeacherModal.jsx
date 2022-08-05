import './AddTeacherModal.css';
import TableAddTeacher from './TableAddTeacher';
import { selectStudent, selectUser } from '../../slice/basketSlice';
import axiosClient from '../../app/axiosClient';
import Loader from '../Loader/Loader';
import { getError } from '../../app/error';
import { UilSearch } from '@iconscout/react-unicons';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Swal from 'sweetalert2';

const AddTeacherModal = ({ isOpen, setIsOpen }) => {
  const [student] = useSelector(selectStudent);
  const user = useSelector(selectUser);
  const [email, setEmail] = useState('');
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(false);

  //function that a professor obtains from the DB
  const handleSubmit = async () => {
    try {
      setLoading(true);
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
      const result = await axiosClient(`auth/${email}`, configToken);
      setTeacher(result.data);
      setEmail('');
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
    <div className='dialog-container'>
      <div
        className='modal-container'
        id='m1-o'
        style={{
          background: 'transparent',
          display: isOpen ? 'flex' : 'none',
        }}
      >
        <div className='modal'>
          {student?._id === '' ? (
            <h1>You must first enter a student ID</h1>
          ) : (
            <>
              <h1>Add teachers to students</h1>
              <div>
                <input
                  type='search'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <UilSearch type='button' onClick={() => handleSubmit()} />
              </div>
              {loading ? (
                <Loader />
              ) : (
                <TableAddTeacher
                  id={student?._id}
                  teacher={teacher}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              )}
            </>
          )}
          <a className='link-2' onClick={() => setIsOpen(!isOpen)}></a>
        </div>
      </div>
    </div>
  );
};

export default AddTeacherModal;
