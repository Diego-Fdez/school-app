import AddStudentSectionModal from './AddStudentSectionModal';
import {
  selectSection,
  selectUser,
  removeStudentSection,
} from '../../slice/basketSlice';
import axiosClient from '../../app/axiosClient';
import { getError } from '../../app/error';
import { UilTimesCircle } from '@iconscout/react-unicons';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useState } from 'react';

const TableSection = () => {
  const [sections] = useSelector(selectSection);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [hasModal, setHasModal] = useState(false);

  /**
   * If the user confirms the deletion, then delete the student.
   */
  const confirmDeleteStudent = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent(id);
      }
    });
  };

  /**
   * It deletes a student from a section.
   * @returns The student is being deleted from the database and the student is being removed from the
   * section.
   */
  const deleteStudent = async (id) => {
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
      const res = await axiosClient.put(
        `list/delete/${sections._id}`,
        { id },
        configToken
      );
      Swal.fire('Deleted!', `${res.data}`, 'success');
      dispatch(removeStudentSection(id));
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
    <div className='table-courses table-section'>
      <AddStudentSectionModal hasModal={hasModal} setHasModal={setHasModal} />
      <div>
        <h2>Section: {sections?.desc}</h2>
        <button onClick={() => setHasModal(!hasModal)}>Add Student</button>
      </div>
      {sections?.studentsInfo?.length === 0 ? (
        <p>There are no students registered in the selected section.</p>
      ) : (
        <>
          {sections?.studentsInfo.map((section) => (
            <div
              className='courses-details section-details'
              key={section?.studentId}
            >
              <p>
                Id:<span>{section?.studentId}</span>
              </p>
              <p>
                Name:{' '}
                <span>{`${section?.studentName} ${section?.studentFirstName} ${section?.studentLastName}`}</span>
              </p>
              <div>
                <UilTimesCircle
                  onClick={() => confirmDeleteStudent(section?._id)}
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TableSection;
