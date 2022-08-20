import EditResultModal from './EditResultModal';
import { formatDate } from '../../helper/formatDate';
import { selectQtResult, selectUser } from '../../slice/basketSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const QtResTable = () => {
  const [qtResults] = useSelector(selectQtResult);
  const user = useSelector(selectUser);
  const [modal, setModal] = useState(false);
  const [quarterSelected, setQuarterSelected] = useState([]);

  return (
    <>
      {qtResults?.map((studentDetail) => (
        <div className='result-card' key={studentDetail?._id}>
          <div className='result-wrapper'>
            <h4>{formatDate(studentDetail?.createdAt)}</h4>
            <div>
              <span>Course:</span>
              <span>{studentDetail?.course.desc}</span>
            </div>
            <div>
              <span>Student:</span>
              <span>{`${studentDetail?.studentId?.studentName} ${studentDetail?.studentId?.studentFirstName} ${studentDetail?.studentId?.studentLastName}`}</span>
            </div>
            <div>
              <span>Period:</span>
              <span>{studentDetail?.quarter?.desc}</span>
            </div>
            <div>
              <span>First Test:</span>
              <span>
                {studentDetail?.test1 ? studentDetail.test1 : 'in progress'}
              </span>
            </div>
            <div>
              <span>Percentage:</span>
              <span>
                {studentDetail?.perTest1
                  ? studentDetail.perTest1 + '%'
                  : 'in progress'}
              </span>
            </div>
            <div>
              <span>Second Test:</span>
              <span>
                {studentDetail?.test2 ? studentDetail?.test2 : 'in progress'}
              </span>
            </div>
            <div>
              <span>Percentage:</span>
              <span>
                {studentDetail?.perTest2
                  ? studentDetail?.perTest2 + '%'
                  : 'in progress'}
              </span>
            </div>
            <div>
              <span>Assists:</span>
              <span>
                {studentDetail?.assists
                  ? studentDetail?.assists + '%'
                  : 'in progress'}
              </span>
            </div>
            <div>
              <span>Homework:</span>
              <span>
                {studentDetail?.homework
                  ? studentDetail?.homework + '%'
                  : 'in progress'}
              </span>
            </div>
            <div>
              <span>Level:</span>
              <span>{studentDetail?.level?.desc}</span>
            </div>
            <div>
              <span>Total:</span>
              <span>
                {(studentDetail.perTest1 ? studentDetail.perTest1 : 0) +
                  (studentDetail.perTest2 ? studentDetail.perTest2 : 0) +
                  (studentDetail.homework ? studentDetail.homework : 0) +
                  (studentDetail.assists ? studentDetail.assists : 0)}
              </span>
            </div>
            {user[0]?.userInfo?.isAdmin ? (
              <div className='card-button'>
                <button
                  onClick={() => {
                    setModal(!modal), setQuarterSelected(studentDetail);
                  }}
                >
                  Edit
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      ))}
      <EditResultModal
        modal={modal}
        setModal={setModal}
        quarterSelected={quarterSelected}
      />
    </>
  );
};

export default QtResTable;
