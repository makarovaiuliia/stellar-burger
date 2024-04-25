import orderReducer, { getOrdersA, createOrder } from './orderSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('orderSlice', () => {
  const initialState = {
    items: [],
    modalOrder: null,
    feedItems: [],
    feed: null,
    loading: false,
    error: undefined,
    orderRequest: false,
    orderModalData: null
  };

  it('handles getOrdersA.pending', () => {
    const action = { type: getOrdersA.pending.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it('handles getOrdersA.fulfilled', () => {
    const mockOrders = [{ id: '1', name: 'Order1' }];
    const action = { type: getOrdersA.fulfilled.type, payload: mockOrders };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      items: mockOrders,
      loading: false
    });
  });

  it('handles getOrdersA.rejected', () => {
    const action = {
      type: getOrdersA.rejected.type,
      error: { message: 'Error' }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({ ...initialState, error: 'Error', loading: false });
  });

  it('handles createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderRequest: true });
  });

  it('handles createOrder.fulfilled', () => {
    const mockOrder = { id: '2', name: 'New Order' };
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const state = orderReducer(initialState, action);
    expect(state.items).toContainEqual(mockOrder);
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.orderRequest).toBe(false);
  });
});
