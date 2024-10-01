import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { pizzaId } = useParams();
  const navigate = useNavigate();
  const apiBase = process.env.REACT_APP_MOCKAPI_TOKEN;

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://${apiBase}.mockapi.io/items/${pizzaId}`);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, [pizzaId]);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h1>
        {pizza.title} - {pizza.price}
      </h1>
      <h2>id пиццы - {pizzaId}</h2>
      <h4>250 р.</h4>
    </div>
  );
};

export default FullPizza;
