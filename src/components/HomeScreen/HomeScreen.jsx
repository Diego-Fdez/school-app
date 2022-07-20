import './HomeScreen.css';
import TableScreen from './TableScreen';
import { UilSearch } from '@iconscout/react-unicons';

const HomeScreen = () => {
  return (
    <div className='home-container'>
      <h1>Promedios</h1>
      <div className='nav-search'>
        <h5>Obtenga los promedios del estudiante</h5>
        <div>
          <input type='search' placeholder='Número de cédula' />
          <UilSearch />
        </div>
      </div>
      <TableScreen />
    </div>
  );
};

export default HomeScreen;
