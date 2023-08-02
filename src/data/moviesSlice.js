import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
    const response = await fetch(apiUrl)
    return response.json()
})

export const fetchMoreMovies = createAsyncThunk('fetch-more-movies', async (apiUrl, { getState }) => {
    const { movies } = getState();
    const { page } = movies;
    const url = `${apiUrl}&page=${page}`;

    const response = await fetch(url)
    return response.json()
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        fetchStatus: '',
        page: 2,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            const results = action.payload.results ?? [];
            
            state.movies = results;
            state.fetchStatus = 'success';

        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading';
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error';
        }).addCase(fetchMoreMovies.fulfilled, (state, action) => {
            const results = action.payload.results ?? [];
            
            state.movies = [
                ...state.movies,
                ...results
            ];
            state.page += state.page;
            state.fetchStatus = 'success';

        }).addCase(fetchMoreMovies.pending, (state) => {
            state.fetchStatus = 'loading';
        }).addCase(fetchMoreMovies.rejected, (state) => {
            state.fetchStatus = 'error';
        })
    }
})

export default moviesSlice
