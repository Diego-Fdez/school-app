import './Nav.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <div className='nav-container'>
        <div className='nav-logo'>
          <h1>Logo</h1>
        </div>
        <div className='nav-list'>
          <ul>
            <li>
              <a>Promedios</a>
            </li>
            <li>
              <a href=''>Notas de Tareas</a>
            </li>
            <li>
              <a href=''>Ver Asistencia</a>
            </li>
            <li>
              <a href=''>Panel</a>
              <ul>
                <li>
                  <NavLink to='/'>Lista de Estudiantes</NavLink>
                </li>
                <li>
                  <NavLink to='create-notes'>Insertar Promedios</NavLink>
                </li>
                <li>
                  <NavLink to='homeworks'>Insertar Notas</NavLink>
                </li>
                <li>
                  <NavLink to='create-student'>Administrar Estudiantes</NavLink>
                </li>
                <li>
                  <NavLink to='assists'>Incluir Asistencia</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className='nav-buttons'>
          <span>Hola, Diego</span>
          <button>
            <NavLink to='auth'>Log out</NavLink>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
