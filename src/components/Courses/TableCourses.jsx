import './CoursesScreen.css';
import { selectCourse } from '../../slice/basketSlice';
import EditCoursesModal from './EditCoursesModal';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const TableCourses = () => {
  const [courses] = useSelector(selectCourse);
  const [openModal, setOpenModal] = useState(false);
  const [selectDesc, setSelectDesc] = useState('');
  const [selectId, setSelectId] = useState('');

  /**
   * "actions" is a function that takes an object with two properties, "id" and "desc", and sets the
   * state of "selectDesc" and "selectId" to the values of those properties.
   */
  const actions = ({ id, desc }) => {
    setSelectDesc(desc);
    setSelectId(id);
  };

  return (
    <div className='table-courses'>
      <h2>List of all Subjects</h2>
      {courses?.map((courseDetails) => (
        <div className='courses-details' key={courseDetails?._id}>
          <p>
            ID:<span>{courseDetails?._id}</span>
          </p>
          <p>
            Name:<span>{courseDetails?.desc}</span>
          </p>
          <div>
            <button
              onClick={() => {
                actions({ id: courseDetails?._id, desc: courseDetails?.desc }),
                  setOpenModal(!openModal);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
      <EditCoursesModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        id={selectId}
        desc={selectDesc}
        setSelectDesc={setSelectDesc}
        setSelectId={setSelectId}
      />
    </div>
  );
};

export default TableCourses;
