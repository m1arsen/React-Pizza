import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import NotFound from './pages/NotFound';

import './scss/app.scss';

const Parent = ({ children }) => {
  return (
    <div>
      <h1>Заголовок</h1>
      {children}
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:pizzaId" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
        <Route />
      </Route>
    </Routes>
  );
}

export default App;
