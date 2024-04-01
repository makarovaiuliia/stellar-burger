import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from './store';

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

export const createOrder = createAsyncThunk(
  'orders/create',
  async (ingredientIds: string[]) => {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  }
);

interface InitialState {
  items: TOrder[];
  loading: boolean;
  error: string | undefined;
  orderRequest: boolean;
  orderModalData: null | TOrder;
}
const initialState: InitialState = {
  items: [],
  loading: false,
  error: undefined,
  orderRequest: false,
  orderModalData: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export const getAllOrders = (state: RootState) => state.orders.items;

export default orderSlice.reducer;
