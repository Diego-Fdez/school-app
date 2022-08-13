import './LevelScreen.css';
import EditLevelsModal from './EditLevelsModal';
import { selectLevel } from '../../slice/basketSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const TableLevels = () => {
  const [levels] = useSelector(selectLevel);
  const [show, setShow] = useState(false);
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
      <h2>List of all Levels</h2>
      {levels?.map((levelDetails) => (
        <div className='courses-details' key={levelDetails?._id}>
          <p>
            ID:<span>{levelDetails?._id}</span>
          </p>
          <p>
            Name:<span>{levelDetails?.desc}</span>
          </p>
          <div>
            <button
              onClick={() => {
                actions({ id: levelDetails?._id, desc: levelDetails?.desc }),
                  setShow(!show);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
      <EditLevelsModal
        show={show}
        setShow={setShow}
        id={selectId}
        desc={selectDesc}
        setSelectDesc={setSelectDesc}
        setSelectId={setSelectId}
      />
    </div>
  );
};

export default TableLevels;
