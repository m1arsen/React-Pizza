import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';

import { setFilters } from '../redux/filter/slice';

import { selectPizzaData } from '../redux/pizza/selectors';
import { selectFilter } from '../redux/filter/selectors';

import { fetchPizzas } from '../redux/pizza/asyncActions';

import { TSearchPizzaParams } from '../redux/pizza/types';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { list } from '../components/Sort';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, searchValue } = useSelector(selectFilter);

  const getPizzas = () => {
    const sortBy = sort.sortProperty;
    const category = categoryId !== 0 ? `category=${categoryId}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        category,
      }),
    );
  };

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as TSearchPizzaParams;

  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         searchValue,
  //         categoryId: Number(params.category),
  //         sort: sort || list[0],
  //       }),
  //     );
  //   }
  //   isSearch.current = true;
  // }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort]);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //     });

  //     navigate('?' + queryString);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort]);

  const pizzas = items
    .filter((obj: any) => {
      const pizzaTitle = obj.title.toLowerCase().trim();
      const searchedValue = searchValue.toLowerCase().trim();

      if (pizzaTitle.includes(searchedValue)) {
        return true;
      } else {
        return false;
      }
    })
    .map((props: any) => <PizzaBlock key={props.id} {...props} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={categoryId} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. <br /> Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
    </div>
  );
};

export default Home;
