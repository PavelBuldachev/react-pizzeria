import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { sortSelector } from '../redux/filter/selectors';
import { setSort } from '../redux/filter/slice';
import { SortPropertyEnum } from '../redux/filter/types';

type ListItem = {
  name: string;
  sortProperty: SortPropertyEnum;
}

export const list: ListItem[] = [
  {name: 'самые популярные', sortProperty: SortPropertyEnum.RATING_DESC},
  {name: 'менее популярные', sortProperty: SortPropertyEnum.RATING_ASC},
  {name: 'дороже', sortProperty: SortPropertyEnum.PRICE_DESC},
  {name: 'дешевле', sortProperty: SortPropertyEnum.PRICE_ASC},
  {name: 'от Я до А', sortProperty: SortPropertyEnum.TITLE_DESC},
  {name: 'от А до Я', sortProperty: SortPropertyEnum.TITLE_ASC}
];

const SortPopup: React.FC = () => {
  const dispatch = useDispatch();
  const sort = useSelector(sortSelector);
  const sortRef = React.useRef<HTMLDivElement>(null)
  const [showPopup, setShowPopup] = React.useState(false);

  const onClickSort = (obj: ListItem) => {
    dispatch(setSort(obj))
    setShowPopup(false)
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
      }
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setShowPopup(false);
      }
    }
    document.body.addEventListener('click', handleClickOutside);
      return () => {
        document.body.removeEventListener('click', handleClickOutside);
      }
  }, []);

    return (
      <div ref ={sortRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сначала:</b>
          <span onClick={() => setShowPopup(!showPopup)}>{sort.name}</span>
        </div>
        {showPopup && (
          <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickSort(obj)}
                className={sort.sortProperty === obj.sortProperty ? "active" : ""}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
    )
}

export default SortPopup;