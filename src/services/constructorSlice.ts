// Import createSlice from Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { stat } from 'fs';

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
    },
    moveIngredient(
      state,
      action: PayloadAction<{
        index: number;
        ingredient: TConstructorIngredient;
        upDown: number;
      }>
    ) {
      const ingredients = state.ingredients;
      ingredients[action.payload.index] =
        ingredients[action.payload.index + action.payload.upDown];
      ingredients[action.payload.index + action.payload.upDown] =
        action.payload.ingredient;
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

// Export actions
export const {
  setBun,
  addIngredient,
  removeIngredient,
  resetConstructor,
  moveIngredient
} = constructorSlice.actions;

// Export reducer
export default constructorSlice.reducer;
