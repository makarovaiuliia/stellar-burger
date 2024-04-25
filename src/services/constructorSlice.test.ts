import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  ConstructorState
} from './constructorSlice';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid')
}));

describe('constructorSlice tests', () => {
  let initialState: ConstructorState;

  beforeEach(() => {
    initialState = {
      bun: null,
      ingredients: []
    };
  });

  it('should handle addIngredient (not a bun)', () => {
    const newIngredient = {
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
    };

    expect(reducer(initialState, addIngredient(newIngredient))).toEqual({
      ...initialState,
      ingredients: [
        {
          ...newIngredient,
          id: 'mocked-uuid'
        }
      ]
    });
  });
  it('should handle removeIngredient', () => {
    const ingredientId = uuidv4();
    const stateWithIngredients = {
      bun: null,
      ingredients: [
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
          image_mobile: '',
          id: ingredientId
        }
      ]
    };
    expect(
      reducer(stateWithIngredients, removeIngredient(ingredientId))
    ).toEqual({
      ...stateWithIngredients,
      ingredients: []
    });
  });

  it('should handle moveIngredient', () => {
    const ingredientOne = {
      _id: '2',
      name: 'Ingredient One',
      type: 'sauce',
      proteins: 5,
      fat: 5,
      carbohydrates: 5,
      calories: 100,
      price: 5,
      image: '',
      image_large: '',
      image_mobile: '',
      id: uuidv4()
    };
    const ingredientTwo = {
      _id: '3',
      name: 'Ingredient Two',
      type: 'sauce',
      proteins: 5,
      fat: 5,
      carbohydrates: 5,
      calories: 100,
      price: 5,
      image: '',
      image_large: '',
      image_mobile: '',
      id: uuidv4()
    };
    const initialState = {
      bun: null,
      ingredients: [ingredientOne, ingredientTwo]
    };
    expect(
      reducer(initialState, moveIngredient({ index: 0, upDown: 1 }))
    ).toEqual({
      bun: null,
      ingredients: [ingredientTwo, ingredientOne]
    });
  });
});
