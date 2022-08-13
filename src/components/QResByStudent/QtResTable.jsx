import EditResultModal from './EditResultModal';
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
            <h4>
              Date: <span>27/04/2022</span>
            </h4>
            <div>
              <span>Course:</span>
              <span>{studentDetail?.course.desc}</span>
            </div>
            <div>
              <span>Student:</span>
              <span>{`${studentDetail?.studentId?.studentName} ${studentDetail?.studentId?.studentFirstName} ${studentDetail?.studentId?.studentLastName}`}</span>
            </div>
            <div>
              <span>Quarter:</span>
              <span>{studentDetail?.quarter?.desc}</span>
            </div>
            <div>
              <span>First Test:</span>
              <span>{studentDetail?.test1 ? studentDetail.test1 : 'Soon'}</span>
            </div>
            <div>
              <span>Percentage:</span>
              <span>
                {studentDetail?.perTest1
                  ? studentDetail.perTest1 + '%'
                  : 'Soon'}
              </span>
            </div>
            <div>
              <span>Second Test:</span>
              <span>
                {studentDetail?.test2 ? studentDetail?.test2 : 'Soon'}
              </span>
            </div>
            <div>
              <span>Percentage:</span>
              <span>
                {studentDetail?.perTest2
                  ? studentDetail?.perTest2 + '%'
                  : 'Soon'}
              </span>
            </div>
            <div>
              <span>Assists:</span>
              <span>
                {studentDetail?.assists ? studentDetail?.assists + '%' : 'Soon'}
              </span>
            </div>
            <div>
              <span>Homework:</span>
              <span>
                {studentDetail?.homework
                  ? studentDetail?.homework + '%'
                  : 'Soon'}
              </span>
            </div>
            <div>
              <span>Level:</span>
              <span>{studentDetail?.level?.desc}</span>
            </div>
            <div>
              <span>Condition:</span>
              <span>Approved</span>
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
