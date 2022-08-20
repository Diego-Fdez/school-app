import '../Students/Students.css';
import TeacherListTable from './TeacherListTable';

const TeacherListScreen = () => {
  return (
    <div className='assists-container'>
      <h1>Teachers List</h1>
      <div className='assists-wrapper'>
        <TeacherListTable />
      </div>
    </div>
  );
};

export default TeacherListScreen;
