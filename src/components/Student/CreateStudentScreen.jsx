import './CreateStudentScreen.css';

const CreateStudentScreen = () => {
  return (
    <div className='student-container'>
      <form action='' className='infoForm authForm'>
        <h1>Ingrese un nuevo estudiante</h1>
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
            type='text'
            className='infoInput'
            placeholder='Contacto'
            name='contact'
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

export default CreateStudentScreen;
