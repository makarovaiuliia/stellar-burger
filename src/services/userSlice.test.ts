// import userReducer, {
//   registerUser,
//   loginUser,
//   logout,
//   updateUser,
//   getUser,
//   forgotPassword,
//   resetPassword
// } from './userSlice';
// import { Store, configureStore } from '@reduxjs/toolkit';

// jest.mock('../utils/burger-api', () => ({
//   registerUserApi: jest.fn(),
//   loginUserApi: jest.fn(),
//   logoutApi: jest.fn(),
//   updateUserApi: jest.fn(),
//   getUserApi: jest.fn(),
//   forgotPasswordApi: jest.fn(),
//   resetPasswordApi: jest.fn()
// }));
// jest.mock('../utils/cookie', () => ({
//   setCookie: jest.fn()
// }));
// const mockLocalStorage = {
//   setItem: jest.fn(),
//   getItem: jest.fn(),
//   removeItem: jest.fn(),
//   clear: jest.fn(),
//   key: jest.fn(),
//   length: 0
// };
// global.localStorage = mockLocalStorage;

// describe('userSlice', () => {
//   let store: Store;

//   beforeEach(() => {
//     store = configureStore({ reducer: { user: userReducer } });
//     jest.clearAllMocks();
//   });

//   it('handles registration (fulfilled)', async () => {
//     const mockUser = {
//       success: true,
//       data: {
//         refreshToken: '123',
//         accessToken: '123',
//         user: { email: 'test@example.com', name: 'Test User' }
//       }
//     };

//     await store.dispatch(registerUser.fulfilled(mockUser, 'registerUser', {}));
//     const state = store.getState().user;
//     expect(state.user).toEqual(mockUser);
//     expect(state.isAuth).toBe(true);
//   });

//   it('handles login (fulfilled)', async () => {
//     const mockUser = { email: 'login@example.com', name: 'Login User' };
//     await store.dispatch(
//       loginUser.fulfilled({ user: mockUser }, 'loginUser', {})
//     );
//     const state = store.getState().user;
//     expect(state.user).toEqual(mockUser);
//     expect(state.isAuth).toBe(true);
//   });

//   it('handles logout (fulfilled)', async () => {
//     await store.dispatch(logout.fulfilled({}, 'logout', {}));
//     const state = store.getState().user;
//     expect(state.user).toEqual({ email: '', name: '' });
//     expect(state.isAuth).toBe(false);
//   });

//   it('handles user update (fulfilled)', async () => {
//     const updatedUser = { email: 'update@example.com', name: 'Updated User' };
//     await store.dispatch(
//       updateUser.fulfilled({ user: updatedUser }, 'updateUser', {})
//     );
//     const state = store.getState().user;
//     expect(state.user).toEqual(updatedUser);
//   });

//   it('handles getting user data (fulfilled)', async () => {
//     const fetchedUser = { email: 'get@example.com', name: 'Fetched User' };
//     await store.dispatch(
//       getUser.fulfilled({ user: fetchedUser }, 'getUser', {})
//     );
//     const state = store.getState().user;
//     expect(state.user).toEqual(fetchedUser);
//     expect(state.isAuthChecked).toBe(true);
//   });

//   it('handles forgot password (fulfilled)', async () => {
//     const responseMessage = { message: 'Reset link sent' };
//     await store.dispatch(
//       forgotPassword.fulfilled(responseMessage, 'forgotPassword', {})
//     );
//     // Verify state changes or message feedback handling if applicable
//   });

//   it('handles password reset (fulfilled)', async () => {
//     const resetResponse = { message: 'Password successfully reset' };
//     await store.dispatch(
//       resetPassword.fulfilled(resetResponse, 'resetPassword', {})
//     );
//     // Verify state changes or message feedback handling if applicable
//   });

//   // You should add .pending and .rejected tests for each async thunk here
// });

// describe('Reducers and actions', () => {
//   it('handles custom action - authChecked', () => {
//     const action = { type: 'user/authChecked' };
//     const initialState = {
//       user: { email: '', name: '' },
//       isAuth: false,
//       error: undefined,
//       isAuthChecked: false
//     };
//     const state = userReducer(initialState, action);
//     expect(state.isAuthChecked).toBe(true);
//   });
// });
