import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import axios from 'axios';

import { addItem } from '../redux/cart/slice';

import { selectCartItemById } from '../redux/cart/selectors';

import { TPizza } from '../redux/pizza/types';
import { TCartItem } from '../redux/cart/types';

const pizzaTypes = ['тонкая', 'традиционная'];

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<TPizza>();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const { pizzaId } = useParams();
  const validId = pizzaId === undefined ? '' : pizzaId; // сделано для TS

  const cartItem = useSelector(selectCartItemById(validId));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const apiBase = process.env.REACT_APP_MOCKAPI_TOKEN;

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get<TPizza>(`https://${apiBase}.mockapi.io/items/${pizzaId}`);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, [pizzaId]);

  if (!pizza) {
    return <div className="full-pizza__loading">Пицца загружается...</div>;
  }

  const onCLickAdd = () => {
    const item: TCartItem = {
      id: pizza.id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: pizzaTypes[activeType],
      size: pizza.sizes[activeSize],
      count: 0,
    };

    dispatch(addItem(item));
  };

  const goBackButton = () => {
    window.scrollTo(0, 0);
    navigate(-1);
  };

  return (
    <div className="container full-pizza__container">
      <img className="full-pizza__image" src={pizza.imageUrl} alt="Pizza" />
      <div>
        <h1 className="full-pizza__title">{pizza.title}</h1>
        <p className="full-pizza__description">{pizza.description}</p>

        <div className="full-pizza__selector">
          <ul>
            {pizza.types.map((typeId, i) => (
              <li
                key={i}
                className={i === activeType ? 'active' : ''}
                onClick={() => setActiveType(i)}
              >
                {pizzaTypes[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {pizza.sizes.map((size, i) => (
              <li
                key={i}
                className={i === activeSize ? 'active' : ''}
                onClick={() => setActiveSize(i)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>

        <div className="full-pizza__bottom">
          <div className="pizza-block__price">от {pizza.price} ₽</div>
          <button className="button button--outline button--add" onClick={onCLickAdd}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {cartItem ? <i>{cartItem.count}</i> : null}
          </button>
        </div>

        <div className="full-pizza__bottom-buttons">
          <div onClick={goBackButton} className="button button--outline button--add go-back-btn">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>

            <span>Вернуться назад</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
