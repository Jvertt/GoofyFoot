import { configureStore } from '@reduxjs/toolkit';
import coachesReducer from './CoachesSlice';

const store = configureStore({
    reducer: {
      coaches: coachesReducer,
    },
  });
  
  export default store;


  