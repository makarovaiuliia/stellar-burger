import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getAllOrders, getFeeds, getOrdersA } from '../../services/orderSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */

  const orders: TOrder[] = useSelector(getAllOrders);
  const feed = useSelector((state: RootState) => state.orders.feed);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
    dispatch(getOrdersA());
  }, [dispatch]);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
