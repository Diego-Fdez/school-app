import { createSlice, current } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : [],
  student: Cookies.get('student') ? JSON.parse(Cookies.get('student')) : [],
  courses: Cookies.get('courses') ? JSON.parse(Cookies.get('courses')) : [],
  levels: Cookies.get('levels') ? JSON.parse(Cookies.get('levels')) : [],
  quarters: Cookies.get('quarters') ? JSON.parse(Cookies.get('quarters')) : [],
  teachers: Cookies.get('teachers') ? JSON.parse(Cookies.get('teachers')) : [],
  qtResult: Cookies.get('qtResult') ? JSON.parse(Cookies.get('qtResult')) : [],
  sections: Cookies.get('sections') ? JSON.parse(Cookies.get('sections')) : [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    //actions
    /* Adding a new teacher to the user array. */
    teacherInfo: (state, action) => {
      state.user = [...state.user, action.payload];
      Cookies.set('user', JSON.stringify({ ...state.user }), { expires: 30 });
    },
    /* Setting the student state to the payload. */
    studentInfo: (state, action) => {
      state.student = [action.payload];
      Cookies.set('student', JSON.stringify(state.student), { expires: 0.012 });
    },
    /* Adding a new teacher to the student's teacher array. */
    addTeacher: (state, action) => {
      const newTeacher = [state.student[0]];
      newTeacher.map((teacher) => teacher.teachers.push(action.payload));
      state.student = newTeacher;
      Cookies.set('student', JSON.stringify(state.student), { expires: 0.012 });
    },
    /* Finding the index of the teacher with the same id as the payload. If it finds it, it removes it.
    If it doesn't find it, it returns the teacher. */
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
    /* Adding a new course to the courses array. */
    coursesInfo: (state, action) => {
      state.courses.push(action.payload);
      Cookies.set('courses', JSON.stringify(state.courses), {
        expires: 0.012,
      });
    },
    /* Adding a new course to the courses array. */
    createCourse: (state, action) => {
      state.courses[0].push(action.payload);
      Cookies.set('courses', JSON.stringify(state.courses), {
        expires: 0.012,
      });
    },
    /* Mapping through the courses array and finding the course with the same id as the payload. If it
    finds it, it replaces it with the payload. If it doesn't find it, it returns the course. */
    editCourse: (state, action) => {
      const newCourse = state.courses[0].map((course) =>
        course._id === action.payload._id ? action.payload : course
      );
      state.courses = [newCourse];
      Cookies.set('courses', JSON.stringify(state.courses), {
        expires: 0.012,
      });
    },
    /* Adding a new level to the levels array. */
    levelsInfo: (state, action) => {
      state.levels.push(action.payload);
      Cookies.set('levels', JSON.stringify(state.levels), {
        expires: 0.012,
      });
    },
    /* Adding a new level to the levels array. */
    createLevel: (state, action) => {
      state.levels[0].push(action.payload);
      Cookies.set('levels', JSON.stringify(state.levels), {
        expires: 0.012,
      });
    },
    /* Mapping through the levels array and finding the level with the same id as the payload. If it
        finds it, it replaces it with the payload. If it doesn't find it, it returns the level. */
    editLevel: (state, action) => {
      const newLevel = state.levels[0].map((level) =>
        level._id === action.payload._id ? action.payload : level
      );
      state.levels = [newLevel];
      Cookies.set('levels', JSON.stringify(state.levels), {
        expires: 0.012,
      });
    },
    /* Adding a new quarter to the quarters array. */
    quartersInfo: (state, action) => {
      state.quarters.push(action.payload);
      Cookies.set('quarters', JSON.stringify(state.quarters), {
        expires: 0.012,
      });
    },
    /* Adding a new quarter to the quarter array. */
    createQuarter: (state, action) => {
      state.quarters[0].push(action.payload);
      Cookies.set('quarters', JSON.stringify(state.quarters), {
        expires: 0.012,
      });
    },
    /* Mapping through the quarters array and finding the quarter with the same id as the payload. If it
        finds it, it replaces it with the payload. If it doesn't find it, it returns the quarter. */
    editQuarter: (state, action) => {
      const newQuarter = state.quarters[0].map((quarter) =>
        quarter._id === action.payload._id ? action.payload : quarter
      );
      state.quarters = [newQuarter];
      Cookies.set('quarters', JSON.stringify(state.quarters), {
        expires: 0.012,
      });
    },
    /* Setting the teacher state to the payload. */
    teachersInfo: (state, action) => {
      state.teachers = [action.payload];
      Cookies.set('teachers', JSON.stringify(state.teachers), {
        expires: 0.012,
      });
    },
    /* Adding a new course to the teacher's course array. */
    addCourse: (state, action) => {
      /**
       * It takes the first element of the courses array, filters it by the id, and then maps the
       * result to a new object.
       * @param result - the result of the query
       * @returns The return value is an array of objects.
       */
      const customReturnFilter = (result) => {
        return state.courses[0]
          .filter((course) => {
            return course._id === action.payload.id;
          })
          .map((finalResult) => {
            return {
              ...finalResult,
            };
          });
      };
      const [newCourse] = customReturnFilter();
      const newTeacher = [state.teachers[0]];
      newTeacher.map((teacher) => teacher.courses.push(newCourse));
      state.teachers = newTeacher;
      Cookies.set('teachers', JSON.stringify(state.teachers), {
        expires: 0.012,
      });
    },
    /* Finding the index of the course with the same id as the payload. If it finds it, it removes it.
    If it doesn't find it, it returns the course. */
    deleteCourse: (state, action) => {
      const removeCourse = [state.teachers[0]];
      const index = removeCourse.map((teacher) =>
        teacher.courses.findIndex((result) => result._id === action.payload)
      );
      const deletedCourse = [state.teachers[0]];
      if (index >= 0) {
        //the id exists in the redux... remove it...
        deletedCourse.map((teacher) => teacher.courses.splice(index, 1));
      }
      state.teachers = deletedCourse;
      Cookies.set('teachers', JSON.stringify(state.teachers), {
        expires: 0.012,
      });
    },
    /* Setting the qtResult state to the payload. */
    qtResultInfo: (state, action) => {
      state.qtResult = [action.payload];
      Cookies.set('qtResult', JSON.stringify(state.qtResult), {
        expires: 0.012,
      });
    },
    /* Adding a new quarter to the qtResult array. */
    createQuarterResult: (state, action) => {
      state.qtResult[0].push(action.payload);
      Cookies.set('qtResult', JSON.stringify(state.qtResult), {
        expires: 0.012,
      });
    },
    /* Mapping through the qtResult array and finding the quarter with the same id as the payload. If
    it
            finds it, it replaces it with the payload. If it doesn't find it, it returns the
    quarter. */
    editLQtResult: (state, action) => {
      const newQtResult = state.qtResult[0].map((qtResults) =>
        qtResults._id === action.payload._id ? action.payload : qtResults
      );
      state.qtResult = [newQtResult];
      Cookies.set('qtResult', JSON.stringify(state.qtResult), {
        expires: 0.012,
      });
    },
    /* Setting the state of the sections to the payload. */
    sectionInfo: (state, action) => {
      state.sections = [action.payload];
      Cookies.set('sections', JSON.stringify(state.sections), {
        expires: 0.012,
      });
    },
    /* Adding a new student to the studentsInfo array. */
    addStudentSection: (state, action) => {
      const newStudent = [state.sections[0]];
      newStudent.map((currentStudent) =>
        currentStudent.studentsInfo.push(action.payload)
      );
      state.sections = newStudent;
      Cookies.set('sections', JSON.stringify(state.sections), {
        expires: 0.012,
      });
    },
    removeStudentSection: (state, action) => {
      const currentSection = [state.sections[0]];
      const index = currentSection.map((section) =>
        section.studentsInfo.findIndex(
          (result) => result._id === action.payload
        )
      );
      const deleteStudent = [state.sections[0]];
      if (index >= 0) {
        //the id exists in the redux... remove it...
        deleteStudent.map((section) => section.studentsInfo.splice(index, 1));
      }
      state.sections = deleteStudent;
      Cookies.set('sections', JSON.stringify(state.sections), {
        expires: 0.012,
      });
    },
    isLogout: (state) => {
      state.user = [];
      state.student = [];
      state.courses = [];
      state.levels = [];
      state.quarters = [];
      state.teachers = [];
      state.qtResult = [];
      state.sections = [];
      Cookies.remove('user');
      Cookies.remove('student');
      Cookies.remove('courses');
      Cookies.remove('levels');
      Cookies.remove('quarters');
      Cookies.remove('teachers');
      Cookies.remove('qtResult');
      Cookies.remove('sections');
    },
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
  levelsInfo,
  createLevel,
  editLevel,
  quartersInfo,
  createQuarter,
  editQuarter,
  teachersInfo,
  addCourse,
  deleteCourse,
  qtResultInfo,
  createQuarterResult,
  editLQtResult,
  sectionInfo,
  addStudentSection,
  removeStudentSection,
  isLogout,
} = basketSlice.actions;

export const selectUser = (state) => state.basket.user;
export const selectStudent = (state) => state.basket.student;
export const selectCourse = (state) => state.basket.courses;
export const selectLevel = (state) => state.basket.levels;
export const selectQuarter = (state) => state.basket.quarters;
export const selectTeacher = (state) => state.basket.teachers;
export const selectQtResult = (state) => state.basket.qtResult;
export const selectSection = (state) => state.basket.sections;

export default basketSlice.reducer;
