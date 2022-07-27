import './PanelScreen.css';
import { elements } from '../../app/panelElements';

const PanelScreen = () => {
  return (
    <div className='panel'>
      <h1>Admin Dashboard</h1>
      <div className='panel-container'>
        {elements?.map((element) => (
          <div className='panel-card' key={element.id}>
            <div className='info'>
              <img src={element.icon} alt={element.title} />
              <h4>{element.title}</h4>
              <button>Go</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelScreen;
