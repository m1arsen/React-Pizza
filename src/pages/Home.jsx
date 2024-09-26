import { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../App';

import axios from 'axios';

import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchValue } = useContext(SearchContext);

  const { categoryId, sort } = useSelector((state) => state.filter);

  useEffect(() => {
    setIsLoading(true);

    const apiBase = process.env.REACT_APP_MOCKAPI_TOKEN;
    const categoryQuery = categoryId !== 0 ? `category=${categoryId}` : '';

    axios
      .get(
        `https://${apiBase}.mockapi.io/items?${categoryQuery}&sortBy=${sort.sortProperty}&order=desc`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  }, [categoryId, sort]);

  const pizzas = items
    .filter((obj) => {
      const pizzaTitle = obj.title.toLowerCase().trim();
      const searchedValue = searchValue.toLowerCase().trim();

      if (pizzaTitle.includes(searchedValue)) {
        return true;
      } else {
        return false;
      }
    })
    .map((props) => <PizzaBlock key={props.id} {...props} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};

export default Home;
