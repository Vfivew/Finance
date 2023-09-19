import { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import {
  sortTickersByNameAscending,
  sortTickersByNameDescending,
  sortTickersByDateAscending,
  sortTickersByDateDescending,
  sortTickersByPriceAscending,
  sortTickersByPriceDescending,
  sortTickersByTodayPriceAscending,
  sortTickersByTodayPriceDescending,
  sortTickersByProfitAscending,
  sortTickersByProfitDescending,
} from '../../store/slice/tickersSlice';

const SortStock: FC = () => {
  const dispatch = useAppDispatch();
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);

    switch (event.target.value) {
      case 'name-asc':
        dispatch(sortTickersByNameAscending());
        break;
      case 'name-desc':
        dispatch(sortTickersByNameDescending());
        break;
      case 'date-asc':
        dispatch(sortTickersByDateAscending());
        break;
      case 'date-desc':
        dispatch(sortTickersByDateDescending());
        break;
      case 'price-asc':
        dispatch(sortTickersByPriceAscending());
        break;
      case 'price-desc':
        dispatch(sortTickersByPriceDescending());
        break;
      case 'today-price-asc':
        dispatch(sortTickersByTodayPriceAscending());
        break;
      case 'today-price-desc':
        dispatch(sortTickersByTodayPriceDescending());
        break;
    case 'profit-asc':
        dispatch(sortTickersByProfitAscending());
        break;
      case 'profit-desc':
        dispatch(sortTickersByProfitDescending());
        break;
      default:
        break;
    }
  };

  return (
    <select className="text-black mt-2" value={sortOption} onChange={handleSortChange}>
      <option value="name-asc">Name Ascending</option>
      <option value="name-desc">Name Descending</option>
      <option value="date-asc">Date Ascending</option>
      <option value="date-desc">Date Descending</option>
      <option value="price-asc">Price Ascending</option>
      <option value="price-desc">Price Descending</option>
      <option value="today-price-asc">Today's Price Ascending</option>
      <option value="today-price-desc">Today's Price Descending</option>
      <option value="profit-asc">Profit Ascending</option>
      <option value="profit-desc">Profit Descending</option>
    </select>
  );
};

export default SortStock;
