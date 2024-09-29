import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FullPizza() {
  const [pizza, setPizza] = useState();
  const { pizzaId } = useParams();

  useEffect(() => {
    axios
      .get('https://66f31c6771c84d805877e165.mockapi.io/items/' + pizzaId)
      .then((res) => {
        setPizza(res.data);
        // console.log(res.data);
      })
      .catch((e) => {
        console.log('ERROR: ', e);
      });
  }, [pizzaId]);

  if (!pizza) {
    return 'Загрузка...';
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
}

export default FullPizza;
