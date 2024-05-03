import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientSlice';
import ordersReducer from './orderSlice';
import constructorReducer from './constructorSlice';
import userReducer from './userSlice';

describe('rootReducer Initialization', () => {
  it('handles unknown action correctly', () => {
    const rootReducer = combineReducers({
      ingredients: ingredientsReducer,
      orders: ordersReducer,
      constructorItems: constructorReducer,
      user: userReducer
    });

    const fakeAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, fakeAction);

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, fakeAction),
      orders: ordersReducer(undefined, fakeAction),
      constructorItems: constructorReducer(undefined, fakeAction),
      user: userReducer(undefined, fakeAction)
    });
  });
});
