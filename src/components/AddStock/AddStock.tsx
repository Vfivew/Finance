import { FC, useState, useEffect } from 'react';
import { useGetTickerInfoQuery, useGetStockPricesForDateQuery } from '../../store/slice/apiSlice';
import { addDataFirebase } from '../../services/addDataFirebase';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { addTicker } from '../../store/slice/tickersSlice';
import { getPreviousWeekday } from '../../utils/getPreviousWeekday';
import { Link } from 'react-router-dom';
import ErrorHandling from '../Error/ErrorHandling'; 
import StockPriceInfo from './StockPriceInfo';
import TickerInfo from './TickerInfo';
import TickerInput from './TickerInput';
import Loading from '../Loading/Loading'

const AddStock: FC = () => {
  const [tickerInput, setTickerInput] = useState<string>('');
  const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [following, setIsFollowing] = useState<boolean>(false);
  const [trackeDate, setTrackedDate] = useState<string>('');
  const userEmail = useAppSelector((state) => state.user.email);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false); 

  const { data: tickerInfo, error: tickerErrorQuery } = useGetTickerInfoQuery(tickerInput.toUpperCase(), {
    skip: !isQueryEnabled,
    refetchOnMountOrArgChange: true,
  });

  const { data: stockPriceInfo, error: stockPriceErrorQuery } = useGetStockPricesForDateQuery(
    {
      ticker: tickerInput.toUpperCase(),
      startDate: selectedDate,
      endDate: getPreviousWeekday(),
    },
    {
      skip: !isQueryEnabled,
      refetchOnMountOrArgChange: true,
    }
  );
  useEffect(() => {
    if (tickerErrorQuery || stockPriceErrorQuery) {
      setHasError(true); 
    }
    else if (tickerInfo && stockPriceInfo && stockPriceInfo.results) {
      setIsLoading(true);
      addDataFirebase({ results: tickerInfo.results, userEmail, selectedDate, stockPrice: stockPriceInfo.results[0].c })
        .then((result) => {
          if (result.success) {
            setIsFollowing(result.isFollowing);
            setTrackedDate(result.trackedDate);
            if (!result.isFollowing) {
              console.log(stockPriceInfo.results[stockPriceInfo.results.length - 1].c);
              const newTicker = {
                name: tickerInfo.results.name,
                ticker: tickerInfo.results.ticker,
                selectedDate: selectedDate,
                stockPrice: stockPriceInfo.results[0].c,
                previousDayStockPrice: stockPriceInfo.results[stockPriceInfo.results.length - 1].c,
              };
              dispatch(addTicker(newTicker));
            }
          }
        })
        .catch((error) => {
          console.error('Error when adding data to Firebase:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [tickerInfo, dispatch, userEmail, hasError, tickerErrorQuery, stockPriceErrorQuery]);

  const handleGetTickerInfo = () => {
    if (tickerInput && selectedDate) {
      setIsQueryEnabled(true);
    }
    setHasError(false); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'text') {
      setTickerInput(e.target.value);
    } else if (e.target.type === 'date') {
      setSelectedDate(e.target.value);
    }
    setIsQueryEnabled(false);
  };

return (
  <div>
    <div className='flex justify-between items-center'>
      <h2 className='font-bold text-size22'>Ticker information</h2>
      <Link to="/"
        className="base-btn m-2"
        >
        Back to Main
      </Link>
    </div>
      <TickerInput
        tickerInput={tickerInput}
        selectedDate={selectedDate}
        onInputChange={handleInputChange}
        onGetTickerInfo={handleGetTickerInfo}
      />
      <div>
        {following && !hasError && <p> You are already tracking the ticker from the date {trackeDate}</p>}
        {(stockPriceErrorQuery || tickerErrorQuery) ? (
          <ErrorHandling error={stockPriceErrorQuery || tickerErrorQuery} /> 
        ) : (
          isLoading ? (
            <Loading/>
          ) : (
            stockPriceInfo &&  tickerInfo && !hasError ? (
            <div>
                <StockPriceInfo
                stockPriceInfo={stockPriceInfo}
                selectedDate={selectedDate}
                />
                <TickerInfo tickerInfo={tickerInfo} />
            </div>
            ) : (
              <ErrorHandling error={null} />
            )
          )
        )}
      </div>
   </div>
  );
};

export default AddStock;
