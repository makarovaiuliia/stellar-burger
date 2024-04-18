// Import createSlice from Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

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
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: uuidv4()
        }
      })
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
