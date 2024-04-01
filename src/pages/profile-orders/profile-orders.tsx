import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getAllOrders } from '../../services/orderSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getAllOrders);

  return <ProfileOrdersUI orders={orders} />;
};
