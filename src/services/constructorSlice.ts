// Import createSlice from Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface ConstructorState {
  bun: null | TIngredient;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      const ingredient: TConstructorIngredient = {
        id: state.ingredients.length.toString(),
        ...action.payload
      };
      state.ingredients.push(ingredient);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );
      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    }
  }
});

// Export actions
export const { setBun, addIngredient, removeIngredient } =
  constructorSlice.actions;

// Export reducer
export default constructorSlice.reducer;
