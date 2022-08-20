import './Nav.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, isLogout } from '../../slice/basketSlice';

const Nav = () => {
  // the redux user is used
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hasLogout = async () => {
    dispatch(isLogout());
    navigate('/auth');
  };

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
                <Link to='panel'>Dashboard</Link>
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
            <button onClick={() => hasLogout()}>Log out</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
