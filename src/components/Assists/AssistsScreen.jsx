import './AssistsScreen.css';
import AssistsTable from './AssistsTable';

const data = [
  { userName: 'Diego Fedez', assists: true, late: false },
  { userName: 'Roslyn Vargas', assists: true, late: false },
  { userName: 'Hey fernández', assists: true, late: false },
  { userName: 'Dominick Rodriguez', assists: true, late: false },
  { userName: 'Dariel Aguirre', assists: true, late: false },
];

const AssistsScreen = () => {
  return (
    <div className='assists-container'>
      <h1>Lista de Asistencia</h1>
      <div className='assists-header'>
        <div>
          <span>Sección</span>
          <select name='' id='' className='infoInput'>
            <option value=''>--Sección--</option>
            <option value=''>1-A</option>
            <option value=''>2-A</option>
            <option value=''>3-A</option>
          </select>
        </div>
        <div>
          <span>Materia</span>
          <select name='' id='' className='infoInput'>
            <option value=''>--Materia--</option>
            <option value=''>Español</option>
            <option value=''>Inglés</option>
            <option value=''>Sociales</option>
          </select>
        </div>
      </div>
      <div className='assists-wrapper'>
        {data.map((datos, i) => (
          <AssistsTable
            key={i}
            userName={datos.userName}
            assists={datos.assists}
            late={datos.late}
          />
        ))}
      </div>
    </div>
  );
};

export default AssistsScreen;
