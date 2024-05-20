import { getIngredientsApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { RootState } from './store';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

export interface InitialState {
  items: TIngredient[];
  loading: boolean;
  error: string | undefined;
}
const initialState: InitialState = {
  items: [],
  loading: false,
  error: undefined
};

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// selectors
export const isLoading = (state: RootState) => state.ingredients.loading;
export const ingredients = (state: RootState) => state.ingredients.items;

export default ingredientSlice.reducer;
