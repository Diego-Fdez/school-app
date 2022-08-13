import EditQuartersModal from './EditQuartersModal';
import { selectQuarter } from '../../slice/basketSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const TableQuarters = () => {
  const [quarters] = useSelector(selectQuarter);
  const [isShow, setIsShow] = useState(false);
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
      <h2>List of all quarters</h2>
      {quarters?.map((quarterDetails) => (
        <div className='courses-details' key={quarterDetails?._id}>
          <p>
            ID:<span>{quarterDetails?._id}</span>
          </p>
          <p>
            Name:<span>{quarterDetails?.desc}</span>
          </p>
          <div>
            <button
              onClick={() => {
                actions({
                  id: quarterDetails?._id,
                  desc: quarterDetails?.desc,
                }),
                  setIsShow(!isShow);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
      <EditQuartersModal
        isShow={isShow}
        setIsShow={setIsShow}
        id={selectId}
        desc={selectDesc}
        setSelectDesc={setSelectDesc}
        setSelectId={setSelectId}
      />
    </div>
  );
};

export default TableQuarters;
