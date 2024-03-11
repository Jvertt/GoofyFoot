
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCoaches = createAsyncThunk(
  'coaches/fetchCoaches',
  async () => {
    const response = await fetch('http://localhost:5555/users');
    return response.json();
  }
);

export const addCoach = createAsyncThunk(
  'coaches/addCoach',
  async (coach) => {
    const response = await fetch('http://localhost:5555/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coach),
    });
    return response.json();
  }
);

const coachesSlice = createSlice({
  name: 'coaches',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoaches.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCoaches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCoaches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCoach.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default coachesSlice.reducer;