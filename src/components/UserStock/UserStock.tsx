import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getDataFirebase } from "../../services/getDataFirebase";
import { deleteDataFirebase } from "../../services/deleteDataFirebase";
import {
  setTickers,
  updatePreviousDayStockPrice,
  removeTicker,
} from "../../store/slice/tickersSlice";
import { getStockPriceForPreviousWorkday } from "../../utils/getStockPriceForPreviousWorkday";
import { getPreviousWeekday } from "../../utils/getPreviousWeekday";
import { Stock } from "../../models/Stock";
import ProfitOrLoss from "./ProfitOrLoss";
import SortStock from "./SortStock";
import Loading from "../Loading/Loading";
import Timer from "./Timer";

const UserStock: FC = () => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const userEmail = useAppSelector((state) => state.user.email) as string;
  const tickers = useAppSelector((state) => state.tickers);
  const dispatch = useAppDispatch();
  const lastData = getPreviousWeekday();
  const isDataLoaded = tickers.length > 0;

  useEffect(() => {
    async function fetchData() {
      try {
        if (!isDataLoaded) {
          setIsLoading(true);
          const tickersData = await getDataFirebase(userEmail);
          if (tickersData.length === 0) {
            setIsLoading(false);
            return;
          }
          setIsLoading(false);
          const stockPricePromises = tickersData.map(async (ticker) => {
            const StockPriceForPreviousWorkday =
              await getStockPriceForPreviousWorkday(ticker.ticker, lastData);
            if (StockPriceForPreviousWorkday !== null) {
              dispatch(
                updatePreviousDayStockPrice({
                  ticker: ticker.ticker,
                  previousDayStockPrice: StockPriceForPreviousWorkday,
                })
              );
            }
            return {
              ...ticker,
              previousDayStockPrice:
                StockPriceForPreviousWorkday || ticker.previousDayStockPrice,
            };
          });

          const updatedTickersData = await Promise.all(stockPricePromises);

          dispatch(setTickers(updatedTickersData));
        }
      } catch (error) {
        console.error("Помилка при завантажені даних з Firebase:", error);
      }
    }

    fetchData();
    updatePreviousDayPrices();

    const timer = setTimeout(() => {
      updatePreviousDayPrices();
    }, 60000);

    return () => clearTimeout(timer);
  }, [dispatch, userEmail, isDataLoaded, tickers, lastData]);

  const updatePreviousDayPrices = async () => {
    for (const ticker of tickers) {
      if (typeof ticker.previousDayStockPrice === "undefined") {
        const StockPriceForPreviousWorkday =
          await getStockPriceForPreviousWorkday(ticker.ticker, lastData);
        if (StockPriceForPreviousWorkday !== null) {
          dispatch(
            updatePreviousDayStockPrice({
              ticker: ticker.ticker,
              previousDayStockPrice: StockPriceForPreviousWorkday,
            })
          );
        } else {
        }
      }
    }
  };

  const handleRemoveTicker = async (ticker: Stock) => {
    try {
      setIsRemoving(true);
      await deleteDataFirebase(ticker.ticker, userEmail);
      dispatch(removeTicker(ticker.ticker));
      setIsRemoving(false);
    } catch (error) {
      setIsRemoving(false);
    }
  };

  return (
    <section>
      <Timer initialSeconds={60} />
      <SortStock />
      <h1 className="font-bold text-size22 mt-2 mb-4">
        Information about tickers
      </h1>
      <div className="overflow-x-auto">
        <table className="table-fixed w-full">
          <thead>
            <tr>
              <th className="w-10% border border-white">Name</th>
              <th className="w-10% border border-white">Ticker</th>
              <th className="w-10% border border-white">Date</th>
              <th className="w-10% border border-white">Share price</th>
              <th className="w-40% border border-white">
                The closing price of the last trading day
              </th>
              <th className="w-10% border border-white">Profit</th>
              <th className="w-10% border border-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="py-2 h-20">
                  <Loading />
                </td>
              </tr>
            ) : (
              tickers.map((ticker, index) => (
                <tr key={index}>
                  <td className="border border-white p-2 h-20 hover:text-first focus:text-first transition-colors duration-300">
                    <Link to={`/stock/${ticker.ticker}`}>
                      <p className="base-btn p-2">{ticker.name}</p>
                    </Link>
                  </td>
                  <td className="border border-white py-2 h-20 ">
                    {ticker.ticker}
                  </td>
                  <td className="border border-white py-2 h-20 ">
                    {ticker.selectedDate}
                  </td>
                  <td className="border border-white py-2 h-20 ">
                    {ticker.stockPrice}$
                  </td>
                  <td className="border border-white py-2 h-20 ">
                    {ticker.previousDayStockPrice}$
                  </td>
                  <td
                    className={`border border-white py-2 h-20 ${
                      isRemoving ? "text-gray-500" : ""
                    }`}
                  >
                    <ProfitOrLoss
                      purchasePrice={ticker.stockPrice}
                      currentPrice={ticker.previousDayStockPrice}
                    />
                  </td>
                  <td className="border border-white py-2 h-20 ">
                    {isRemoving ? (
                      <span>
                        <Loading />
                      </span>
                    ) : (
                      <button
                        className="base-btn"
                        onClick={() => handleRemoveTicker(ticker)}
                      >
                        Stop following
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserStock;
