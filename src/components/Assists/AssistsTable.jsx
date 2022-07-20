import './AssistsScreen.css';

const AssistsTable = ({ userName, assists, late }) => {
  return (
    <>
      <div className='assists-table'>
        <div className='assists-name'>
          <p>Nombre</p>
          <p>{userName}</p>
        </div>
        <div className='assists-present'>
          <p>Presente</p>
          <input value={assists} type='checkbox' />
        </div>
        <div className='assists-late'>
          <p>Tarde</p>
          <input value={late} type='checkbox' />
        </div>
      </div>
    </>
  );
};

export default AssistsTable;
