import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : [],
  student: Cookies.get('student') ? JSON.parse(Cookies.get('student')) : [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    //actions
    teacherInfo: (state, action) => {
      state.user = [...state.user, action.payload];
      Cookies.set('user', JSON.stringify({ ...state.user }));
    },
    studentInfo: (state, action) => {
      state.student = [state.student, action.payload];
      Cookies.set('student', JSON.stringify(state.student));
    },
  },
});

export const { teacherInfo, studentInfo } = basketSlice.actions;

export const selectUser = (state) => state.basket.user;
export const selectStudent = (state) => state.basket.student;

export default basketSlice.reducer;
