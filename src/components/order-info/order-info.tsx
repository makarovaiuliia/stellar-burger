import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getIngredients, ingredients } from '../../services/ingredientSlice';
import {
  getAllOrders,
  getOrderById,
  getOrdersA
} from '../../services/orderSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  console.log(number);
  const orderData = useSelector((state: RootState) => state.orders.modalOrder);

  const ingredientsAll: TIngredient[] = useSelector(ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getOrderById(parseInt(number!)));
  }, [dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredientsAll.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredientsAll.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredientsAll]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
