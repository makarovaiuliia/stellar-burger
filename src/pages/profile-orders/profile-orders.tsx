import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAllOrders, getOrdersA } from '../../services/orderSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getAllOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersA());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
