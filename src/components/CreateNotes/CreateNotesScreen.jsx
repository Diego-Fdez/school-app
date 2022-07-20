import './CreateNotesScreen.css';

const CreateNotesScreen = () => {
  return (
    <div className='createNotes-container'>
      <form action='' className='infoForm authForm'>
        <h1>Agregue las Notas de los Estudiantes</h1>
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
          <input
            type='number'
            placeholder='Año'
            className='infoInput'
            name='year'
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Porcentaje Primer Examen'
            className='infoInput'
            name='firstTest'
          />
          <input
            type='text'
            placeholder='Porcentaje Segundo Examen'
            className='infoInput'
            name='lastTest'
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Trabajo Extra Clase'
            className='infoInput'
            name='extraHome'
          />
          <input
            type='number'
            placeholder='Tareas'
            className='infoInput'
            name='homeWork'
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Asistencia'
            className='infoInput'
            name='assists'
          />
          <input
            type='number'
            placeholder='Otros rubros'
            className='infoInput'
            name='others'
          />
        </div>
        <button className='infoButton' type='submit'>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CreateNotesScreen;
