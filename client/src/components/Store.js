import { configureStore } from '@reduxjs/toolkit';
import lessonsReducer from './LessonsSlice';
import coachesReducer from './coachesSlice';

const store = configureStore({
    reducer: {
      lessons: lessonsReducer,
      coaches: coachesReducer,
    },
  });
  
  export default store;
  