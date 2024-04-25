import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientSlice';
import ordersReducer from './orderSlice';
import constructorReducer from './constructorSlice';
import userReducer from './userSlice';

describe('rootReducer Initialization', () => {
  const expectedIngredientsInitialState = {
    items: [],
    loading: false,
    error: undefined
  };

  const expectedUserInitialState = {
    user: {
      email: '',
      name: ''
    },
    isAuth: false,
    error: undefined,
    isAuthChecked: false
  };

  const expectedOrdersInitialState = {
    items: [],
    modalOrder: null,
    feedItems: [],
    feed: null,
    loading: false,
    error: undefined,
    orderRequest: false,
    orderModalData: null
  };

  const expectedConstructorInitialState = {
    bun: null,
    ingredients: []
  };

  it('should initialize with the correct default state', () => {
    const rootReducer = combineReducers({
      ingredients: ingredientsReducer,
      orders: ordersReducer,
      constructorItems: constructorReducer,
      user: userReducer
    });

    const store = configureStore({
      reducer: rootReducer
    });

    const state = store.getState();

    expect(state.ingredients).toBeDefined();
    expect(state.orders).toBeDefined();
    expect(state.constructorItems).toBeDefined();
    expect(state.user).toBeDefined();

    expect(state.ingredients).toEqual(expectedIngredientsInitialState);
    expect(state.orders).toEqual(expectedOrdersInitialState);
    expect(state.constructorItems).toEqual(expectedConstructorInitialState);
    expect(state.user).toEqual(expectedUserInitialState);
  });
});
