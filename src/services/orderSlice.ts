import { getFeedsApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from './store';

export const getOrdersA = createAsyncThunk('orders/getOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

export const getFeeds = createAsyncThunk('orders/getOrders', async () => {
  const response = await getFeedsApi();
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
  feed: TOrder[];
  loading: boolean;
  error: string | undefined;
  orderRequest: boolean;
  orderModalData: null | TOrder;
}
const initialState: InitialState = {
  items: [],
  feed: [],
  loading: false,
  error: undefined,
  orderRequest: false,
  orderModalData: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderModalData(state) {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersA.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersA.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getOrdersA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.pending, (state, action) => {
        state.orderRequest = true;
      });
  }
});

export const getAllOrders = (state: RootState) => state.orders.items;
export const { resetOrderModalData } = orderSlice.actions;

export default orderSlice.reducer;
