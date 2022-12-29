import React from "react";
import { useSelector } from "react-redux";

import Categories from '../components/Categories';
import Pagination from "../components/Pagination";
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { categorySelector, currentPageSelector, searchSelector, sortPropertySelector } from "../redux/filter/selectors";
import { setCategory, setCurrentPage } from "../redux/filter/slice";
import { pizzaSelector } from "../redux/pizza/selectors";
import { fetchPizzas } from "../redux/pizza/slice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const categoryId = useSelector(categorySelector);
  const sortType = useSelector(sortPropertySelector);
  const currentPage = useSelector(currentPageSelector);
  const searchValue = useSelector(searchSelector);
  const {items, status} = useSelector(pizzaSelector);

  const onClickCategory = React.useCallback((index: number) => {
    dispatch(setCategory(index))
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const order = sortType.includes('-') ? 'asc' : 'desc';
  const sortBy = sortType.replace('-', '');
  const search = searchValue ? `search=${searchValue}` : '';

  React.useEffect(() => {
    dispatch(fetchPizzas({
      category,
      order,
      sortBy,
      search,
      currentPage: String(currentPage),
    }));
    window.scrollTo(0, 0);
  }, [category, order, sortBy, search, currentPage, dispatch]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={onClickCategory}
        />
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error'
      ? <div className="content__error-info">
          <h2>Ошибка 😕</h2>
          <p>Произошла ошибка при запросе пицц</p>
        </div>
      : <div className="content__items">
          {
            status === 'loading'
          ? [...Array(4)].map((_, index) => 
            <Skeleton key={index}/>)
          : items.map((obj: any) => (
              <PizzaBlock key={obj.id} {...obj} />
            )
          )}
        </div>
      }
      <Pagination 
        onChangePage={onChangePage}
      />
    </div>
  )
}

export default Home