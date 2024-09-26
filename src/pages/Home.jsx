import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../App';

import axios from 'axios';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { list } from '../components/Sort';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchValue } = useContext(SearchContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort } = useSelector((state) => state.filter);

  const fetchPizzas = () => {
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
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
      });

      navigate('?' + queryString);
    }
    isMounted.current = true;
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
