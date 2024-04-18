import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder, resetOrderModalData } from '../../services/orderSlice';
import { useNavigate } from 'react-router-dom';
import { resetConstructor } from '../../services/constructorSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector((state) => state.constructorItems);
  const orderRequest = useSelector((state) => state.orders.orderRequest);
  const orderModalData = useSelector((state) => state.orders.orderModalData);
  const isAuth = useSelector((state) => state.user.isAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const order = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    order.push(constructorItems.bun._id);
    order.unshift(constructorItems.bun._id);

    if (isAuth) {
      dispatch(createOrder(order));
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(resetOrderModalData());
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
