import reducer, { getIngredients } from './ingredientSlice';

describe('ingredientsSlice tests', () => {
  const initialState = {
    items: [],
    loading: false,
    error: undefined
  };

  it('should handle getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should handle getIngredients.fulfilled', () => {
    const mockIngredients = [
      {
        _id: '2',
        name: 'Test Ingredient',
        type: 'sauce',
        proteins: 5,
        fat: 5,
        carbohydrates: 5,
        calories: 100,
        price: 5,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      items: mockIngredients,
      loading: false
    });
  });

  it('should handle getIngredients.rejected', () => {
    const error = 'Failed to fetch';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: error }
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: error,
      loading: false
    });
  });
});
