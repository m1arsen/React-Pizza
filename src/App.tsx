import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

import PagePreloader from './components/PagePreloader';

import './scss/app.scss';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<PagePreloader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:pizzaId"
          element={
            <Suspense fallback={<PagePreloader />}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route />
      </Route>
    </Routes>
  );
}

export default App;
