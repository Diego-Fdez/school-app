import './HomeworkScreen.css';

const HomeWorkScreen = () => {
  return (
    <div className='homework-container'>
      <form action='' className='infoForm authForm'>
        <h1>Agregue las Notas de las Tareas</h1>
        <div>
          <input
            type='number'
            placeholder='Cédula'
            className='infoInput'
            name='userId'
          />
          <input
            type='text'
            placeholder='Nombre'
            className='infoInput'
            name='userName'
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Primer Apellido'
            className='infoInput'
            name='firstName'
          />
          <input
            type='text'
            placeholder='Segundo Apellido'
            className='infoInput'
            name='lastName'
          />
        </div>
        <div>
          <select name='grade' id='' className='infoInput'>
            <option value=''>1er Grado</option>
            <option value=''>2do Grado</option>
            <option value=''>3er Grado</option>
          </select>
          <input type='date' className='infoInput' name='date' />
        </div>
        <div>
          <input
            type='text'
            placeholder='Título de la tarea'
            className='infoInput'
            name='homeworkTitle'
          />
          <input
            type='number'
            placeholder='Nota'
            className='infoInput'
            name='qualification'
          />
        </div>
        <div>
          <textarea
            type='number'
            placeholder='Observaciones'
            className='infoInput'
            name='desc'
          />
        </div>
        <button className='infoButton h-button' type='submit'>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default HomeWorkScreen;
