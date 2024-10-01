import { TCartItem } from '../redux/slices/cartSlice';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? (JSON.parse(data) as TCartItem[]) : [];

  return {
    items,
    totalPrice: calcTotalPrice(items),
  };
};
