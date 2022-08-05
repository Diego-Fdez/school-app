import './CreateStudentScreen.css';
import { useForm } from 'react-hook-form';

const CreateStudentScreen = ({ createStudent }) => {
  // the form hook variables are declared
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //function that obtains the data of the child
  const submitHandler = ({
    studentId,
    studentName,
    studentFirstName,
    studentLastName,
    contact,
    observations,
  }) => {
    createStudent({
      studentId,
      studentName,
      studentFirstName,
      studentLastName,
      contact,
      observations,
    });
  };

  return (
    <div className='student-container'>
      <form
        action=''
        className='infoForm authForm'
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1>Enter a new student</h1>
        <div>
          <input
            type='number'
            placeholder='Identification Number'
            className='infoInput'
            name='studentId'
            id='studentId'
            autoFocus
            {...register('studentId', {
              required: 'Please enter the student ID',
            })}
          />
          {/* react hook forms errors */}
          {errors.studentId && (
            <span className='text-error'>{errors.studentId.message}</span>
          )}
          <input
            type='text'
            placeholder='Student Name'
            className='infoInput'
            name='studentName'
            id='studentName'
            {...register('studentName', {
              required: 'Please enter the student name',
            })}
          />
          {/* react hook forms errors */}
          {errors.studentName && (
            <span className='text-error'>{errors.studentName.message}</span>
          )}
        </div>
        <div>
          <input
            type='text'
            placeholder='First Name'
            className='infoInput'
            name='studentFirstName'
            id='studentFirstName'
            {...register('studentFirstName', {
              required: 'Please enter the first name',
            })}
          />
          {/* react hook forms errors */}
          {errors.studentFirstName && (
            <span className='text-error'>
              {errors.studentFirstName.message}
            </span>
          )}
          <input
            type='text'
            placeholder='Last Name'
            className='infoInput'
            name='studentLastName'
            id='studentLastName'
            {...register('studentLastName', {
              required: 'Please enter the last name',
            })}
          />
          {/* react hook forms errors */}
          {errors.studentLastName && (
            <span className='text-error'>{errors.studentLastName.message}</span>
          )}
        </div>
        <div>
          <input
            type='text'
            className='infoInput'
            placeholder='Contact'
            name='contact'
            id='contact'
            {...register('contact')}
          />
        </div>
        <div>
          <textarea
            type='number'
            placeholder='Observations'
            className='infoInput'
            name='observations'
            id='observations'
            {...register('observations')}
          />
        </div>
        <button className='infoButton h-button' type='submit'>
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateStudentScreen;
