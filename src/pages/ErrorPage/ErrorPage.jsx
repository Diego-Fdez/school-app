import './styles.css';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const gifsErrors = [
    'd2jjuAZzDSVLZ5kI',
    'Bp3dFfoqpCKFyXuSzP',
    'hv5AEBpH3ZyNoRnABG',
    'hLwSzlKN8Fi6I',
  ];

  const randomImage = () => {
    return `https://media.giphy.com/media/${
      gifsErrors[Math.floor(Math.random() * gifsErrors.length) + 1]
    }/giphy.gif`;
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className='App-wrapper'>
      <div className='pageErrorStyles'>
        <span className='codeErrorStyles'>404</span>
        <span className='msgErrorStyles'>
          Sometimes getting lost isn't that bad
        </span>
        <img
          className='gifErrorStyles'
          src={randomImage()}
          alt='alt-page-404'
        />
        <button className='btn-error-page' onClick={handleClick}>
          Go back home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
