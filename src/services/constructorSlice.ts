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
    // setBun(state, action: PayloadAction<TBun>) {
    //   state.bun = action.payload;
    // },
    // addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
    //   state.ingredients.push(action.payload);
    // },
    // removeIngredient(state, action: PayloadAction<string>) {
    //   const index = state.ingredients.findIndex(
    //     (ingredient) => ingredient._id === action.payload
    //   );
    //   if (index !== -1) {
    //     state.ingredients.splice(index, 1);
    //   }
    // },
    // clearConstructor(state) {
    //   state.bun = null;
    //   state.ingredients = [];
    // }
  }
});

// Export actions
// export const { setBun, addIngredient, removeIngredient, clearConstructor } =
//   constructorSlice.actions;

// Export reducer
export default constructorSlice.reducer;
