import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { createOrder } from '../../services/orderSlice';
import { Navigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    (state: RootState) => state.constructorItems
  );
  const orderRequest = useSelector(
    (state: RootState) => state.orders.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.orders.orderModalData
  );
  const user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const order = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    order.push(constructorItems.bun._id);
    if (user) {
      dispatch(createOrder(order));
    } else {
      return <Navigate replace to='/login' />;
    }
  };
  const closeOrderModal = () => {};

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
