import CreateStudentScreen from '../components/Student/CreateStudentScreen';
import Loader from '../components/Loader/Loader';
import { selectUser } from '../slice/basketSlice';
import axiosClient from '../app/axiosClient';
import { getError } from '../app/error';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Swal from 'sweetalert2';

const CreateStudent = () => {
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);

  //function that saves a new student to the DB
  const createStudent = async ({
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
      // data is sent to the DB
      const result = await axiosClient.post(
        'student/register',
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
        <CreateStudentScreen createStudent={createStudent} />
      )}
    </>
  );
};

export default CreateStudent;
