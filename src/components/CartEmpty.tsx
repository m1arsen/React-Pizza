import { useNavigate } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => {
  const navigate = useNavigate();

  const goBackButton = () => {
    window.scrollTo(0, 0);
    navigate('/');
  };

  return (
    <>
      <div className="cart cart--empty">
        <h2>Корзина пустая 😕</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <button onClick={goBackButton} className="button button--black">
          <span>Вернуться назад</span>
        </button>
      </div>
    </>
  );
};

export default CartEmpty;
