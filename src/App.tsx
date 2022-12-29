import React from 'react';
import { Route, Routes } from 'react-router';

import Home from './pages/Home';
import './scss/app.scss'
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */'./pages/FullPizza'));

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={ <Home /> }/>
        <Route path='cart' element={ <React.Suspense fallback={<div className='container'>Скоро откроется корзина...</div>}><Cart /></React.Suspense> }/>
        <Route path='pizza/:id' element={ <React.Suspense fallback={<div className='container'>Скоро откроется страница пиццы...</div>}><FullPizza /></React.Suspense> }/>
        <Route path='*' element={ <React.Suspense fallback={<div className='container'>Страница не найдена...</div>}><NotFound /></React.Suspense> }/>
      </Route>
    </Routes>
  );
}

export default App;