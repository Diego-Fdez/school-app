import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : [],
  student: Cookies.get('student') ? JSON.parse(Cookies.get('student')) : [],
  courses: Cookies.get('courses') ? JSON.parse(Cookies.get('courses')) : [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    //actions
    teacherInfo: (state, action) => {
      state.user = [...state.user, action.payload];
      Cookies.set('user', JSON.stringify({ ...state.user }), { expires: 30 });
    },
    studentInfo: (state, action) => {
      state.student = [action.payload];
      Cookies.set('student', JSON.stringify(state.student), { expires: 0.012 });
    },
    addTeacher: (state, action) => {
      const newTeacher = [state.student[0]];
      newTeacher.map((teacher) => teacher.teachers.push(action.payload));
      state.student = newTeacher;
      Cookies.set('student', JSON.stringify(state.student), { expires: 0.012 });
    },
    removeTeacher: (state, action) => {
      const newTeacher = [state.student[0]];
      const index = newTeacher.map((teacher) =>
        teacher.teachers.findIndex((result) => result._id === action.payload)
      );
      const newStudent = [state.student[0]];
      if (index >= 0) {
        //the id exists in the redux... remove it...
        newStudent.map((teacher) => teacher.teachers.splice(index, 1));
      }
      state.student = newStudent;
      Cookies.set('student', JSON.stringify(state.student), { expires: 0.012 });
    },
    coursesInfo: (state, action) => {
      state.courses.push(action.payload);
      Cookies.set('courses', JSON.stringify(state.courses), {
        expires: 0.012,
      });
    },
    createCourse: (state, action) => {
      state.courses[0].push(action.payload);
      Cookies.set('courses', JSON.stringify(state.courses), {
        expires: 0.012,
      });
    },
    editCourse: (state, action) => {
      const newCourse = state.courses[0].map((course) =>
        course._id === action.payload._id ? action.payload : course
      );
      state.courses = [newCourse];
      Cookies.set('courses', JSON.stringify(state.courses), {
        expires: 0.012,
      });
    },
    removeCourse: (state, action) => {},
  },
});

export const {
  teacherInfo,
  studentInfo,
  addTeacher,
  removeTeacher,
  coursesInfo,
  createCourse,
  editCourse,
  removeCourse,
} = basketSlice.actions;

export const selectUser = (state) => state.basket.user;
export const selectStudent = (state) => state.basket.student;
export const selectCourse = (state) => state.basket.courses;

export default basketSlice.reducer;
