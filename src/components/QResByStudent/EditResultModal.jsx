import RegisterResultScreen from '../RegisterResultScreen/RegisterResultScreen';
import { selectStudent, selectUser } from '../../slice/basketSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EditResultModal = ({ modal, setModal, quarterSelected }) => {
  const [student] = useSelector(selectStudent);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (student === undefined) {
      navigate('/');
    }
  }, [student]);

  return (
    <div className='dialog-container'>
      <div
        className='modal-container'
        id='m1-o'
        style={{
          background: 'transparent',
          display: modal ? 'flex' : 'none',
        }}
      >
        <div className='modal'>
          {student === undefined ? (
            <h2>
              You must select a student <Link to='/'>Go</Link>
            </h2>
          ) : (
            <RegisterResultScreen
              modal={modal}
              quarterSelected={quarterSelected}
            />
          )}
          <a className='link-2' onClick={() => setModal(!modal)}></a>
        </div>
      </div>
    </div>
  );
};

export default EditResultModal;
