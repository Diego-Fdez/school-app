import './HomeScreen.css';
import { useSelector } from 'react-redux';
import { selectStudent } from '../../slice/basketSlice';
import { Link } from 'react-router-dom';

const TableScreen = () => {
  const student = useSelector(selectStudent);

  return (
    <>
      <div className='card-container'>
        <div className='card'>
          <div className='box'>
            <div className='content'>
              <h2>{student[1]?.studentId}</h2>
              <h3>{`${student[1]?.studentName} ${student[1]?.studentFirstName} ${student[1]?.studentLastName}`}</h3>
              <p>Assigned Teachers:</p>
              {student[1]?.teachers?.map((teacher) => (
                <span
                  key={teacher._id}
                >{`${teacher.userName} ${teacher.firstName}`}</span>
              ))}
              <div>
                <Link to={`results-student/${student[1]._id}`}>See grades</Link>
                <a href='#'>Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableScreen;
