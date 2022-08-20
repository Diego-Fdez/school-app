import './Students.css';
import StudentsTable from './StudentsTable';

const StudentsScreen = () => {
  return (
    <div className='assists-container'>
      <h1>Student List</h1>
      <div className='assists-wrapper'>
        <StudentsTable />
      </div>
    </div>
  );
};

export default StudentsScreen;
