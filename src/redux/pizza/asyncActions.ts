import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { TPizza, TSearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<TPizza[], TSearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async ({ sortBy, category }) => {
    const apiBase = process.env.REACT_APP_MOCKAPI_TOKEN;

    const { data } = await axios.get<TPizza[]>(
      `https://${apiBase}.mockapi.io/items?${category}&sortBy=${sortBy}&order=desc`,
    );

    return data;
  },
);
