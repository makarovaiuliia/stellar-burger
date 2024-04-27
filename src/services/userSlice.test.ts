import reducer, { getUser, loginUser } from './userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setCookie } from '../utils/cookie';

jest.mock('../utils/burger-api', () => ({
  getUserApi: jest.fn()
}));

jest.mock('../utils/burger-api', () => ({
  getUserApi: jest.fn(() =>
    Promise.resolve({
      user: { email: 'test@example.com', name: 'Test User' }
    })
  ),
  loginUserApi: jest.fn(() =>
    Promise.resolve({
      user: { email: 'test@example.com', name: 'Test User' },
      accessToken: 'access-token',
      refreshToken: 'refresh-token'
    })
  )
}));

jest.mock('../utils/cookie', () => ({
  setCookie: jest.fn()
}));

global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(() => null),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn((index: number) => null)
};

describe('user tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('get user test', async () => {
    const store = configureStore({ reducer: { user: reducer } });
    await store.dispatch(getUser());

    const state = store.getState().user;
    expect(state.user).toEqual({
      email: 'test@example.com',
      name: 'Test User'
    });
    expect(state.isAuth).toBeTruthy();
    expect(state.isAuthChecked).toBeTruthy();
  });

  it('should handle loginUser', async () => {
    const store = configureStore({ reducer: { user: reducer } });

    const mockUserData = {
      user: { email: 'test@example.com', name: 'Test User' },
      accessToken: 'access-token',
      refreshToken: 'refresh-token'
    };

    await store.dispatch(
      loginUser({ email: 'test@example.com', password: 'password' })
    );

    const state = store.getState().user;
    expect(state.user).toEqual(mockUserData.user);
    expect(state.isAuth).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      'refresh-token'
    );
    expect(setCookie).toHaveBeenCalledWith('accessToken', 'access-token');
  });
});
