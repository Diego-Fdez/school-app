import './Nav.css';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slice/basketSlice';

const Nav = () => {
  // the redux user is used
  const user = useSelector(selectUser);

  return (
    <nav>
      <div className='nav-container'>
        <div className='nav-logo'>
          <h1>School Office</h1>
        </div>
        <div className='nav-list'>
          <ul>
            <li>
              <Link to='/'>Student Search</Link>
            </li>
            {/* if he is a teacher the nav is shown */}
            {user[0]?.userInfo.isTeacher ? (
              <li>
                <Link to='panel'>Panel</Link>
              </li>
            ) : null}
          </ul>
        </div>
        <div className='nav-buttons'>
          <span>
            {/* if a user logs in, the name is displayed */}
            {user?.length === 0 ? '' : `Hi, ${user[0]?.userInfo.userName}`}
          </span>
          {/* if a user logs in, logout button is shown */}
          {user?.length === 0 ? null : (
            <button>
              <NavLink to='auth'>Log out</NavLink>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
