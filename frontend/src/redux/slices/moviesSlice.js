import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMovies,
  getLatestWatchedMovies,
  getLatestUnwatchedMovies,
  deleteMovie,
} from "../../services/movieService";

// Thunks para chamadas assíncronas
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const data = await getMovies();
  return data;
});

export const fetchLatestWatched = createAsyncThunk(
  "movies/fetchLatestWatched",
  async () => {
    const data = await getLatestWatchedMovies();
    return data;
  }
);

export const fetchLatestUnwatched = createAsyncThunk(
  "movies/fetchLatestUnwatched",
  async () => {
    const data = await getLatestUnwatchedMovies();
    return data;
  }
);

export const removeMovie = createAsyncThunk(
  "movies/removeMovie",
  async (id) => {
    await deleteMovie(id);
    return id;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    latestWatched: [],
    latestUnwatched: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchMovies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchLatestWatched
      .addCase(fetchLatestWatched.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestWatched.fulfilled, (state, action) => {
        state.latestWatched = action.payload;
        state.loading = false;
      })
      .addCase(fetchLatestWatched.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchLatestUnwatched
      .addCase(fetchLatestUnwatched.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestUnwatched.fulfilled, (state, action) => {
        state.latestUnwatched = action.payload;
        state.loading = false;
      })
      .addCase(fetchLatestUnwatched.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // removeMovie
      .addCase(removeMovie.fulfilled, (state, action) => {
        state.list = state.list.filter((movie) => movie.id !== action.payload);
        state.latestWatched = state.latestWatched.filter(
          (movie) => movie.id !== action.payload
        );
        state.latestUnwatched = state.latestUnwatched.filter(
          (movie) => movie.id !== action.payload
        );
      });
  },
});

export default moviesSlice.reducer;
