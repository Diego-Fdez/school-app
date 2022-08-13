import './Sections.css';
import { sectionList } from '../../app/sectionList';
import axiosClient from '../../app/axiosClient';
import TableSection from './TableSection';
import Loader from '../Loader/Loader';
import resultImage from '../../assets/undraw_Result.png';
import { getError } from '../../app/error';
import {
  selectUser,
  sectionInfo,
  selectSection,
} from '../../slice/basketSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { UilSearch } from '@iconscout/react-unicons';
import Swal from 'sweetalert2';

const SectionsScreen = () => {
  const user = useSelector(selectUser);
  const [sections] = useSelector(selectSection);
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * "I'm trying to register a new section in the database, but I'm getting an error that says 'Cannot
   * read property 'token' of undefined'".
   * @returns The new list created.
   */
  const registerSection = async () => {
    try {
      //token validation
      const token = user[0]?.token;
      if (!token) return;

      //token configuration
      const configToken = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axiosClient.post(
        'list/register',
        { desc: description },
        configToken
      );
      Swal.fire('Register!', `${res.data.message}`, 'success');
      dispatch(sectionInfo(res.data.newList));
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${getError(error)}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  /**
   * It's a function that gets the section information from the database.
   * @returns It's a list of sections that are in the database.
   */
  const getSection = async (e) => {
    //token validation
    const token = user[0]?.token;
    if (!token) return;

    /* It's a configuration for the token. */
    const configToken = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoading(true);
      const result = await axiosClient(`list/${description}`, configToken);
      dispatch(sectionInfo(result.data));
      setLoading(false);
    } catch (error) {
      /* It's a conditional that checks if the section exists in the database. If it doesn't exist, it
      will show a message asking if you want to register the section. */
      if (error.response.data.message === 'Section not found') {
        Swal.fire({
          title: `${error.response.data.message}`,
          text: '¿Do you want to register the section?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, register it!',
        }).then((result) => {
          if (result.isConfirmed) {
            registerSection();
            setLoading(false);
          }
        });
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${getError(error)}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className='sections-container'>
      <h1>Register or remove students from a section</h1>
      <div className='nav-search'>
        <h5>Get section:</h5>
        <div>
          <select onChange={(e) => setDescription(e.target.value)}>
            <option value=''>--Select a Section--</option>
            {sectionList?.map((sections) => (
              <option key={sections.id} value={sections.desc}>
                {sections.desc}
              </option>
            ))}
          </select>
          <UilSearch type='button' onClick={() => getSection()} />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {sections === undefined ? (
            <img src={resultImage} alt='No data image' />
          ) : (
            <TableSection />
          )}
        </>
      )}
    </div>
  );
};

export default SectionsScreen;
