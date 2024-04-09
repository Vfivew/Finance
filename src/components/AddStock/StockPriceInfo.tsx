interface StockPriceInfoProps {
  stockPriceInfo: {
    results: {
      c: number;
    }[];
  };
  selectedDate: string;
}
const StockPriceInfo: React.FC<StockPriceInfoProps> = ({
  stockPriceInfo,
  selectedDate,
}) => {
  return (
    <div>
      <h2>Information about price at date {selectedDate}:</h2>
      {stockPriceInfo.results && stockPriceInfo.results.length > 0 ? (
        <div>
          <p className="text-size18 font-bold">
            {stockPriceInfo.results[0].c} $
          </p>
        </div>
      ) : (
        <p>There were no trades on this day.</p>
      )}
    </div>
  );
};

export default StockPriceInfo;
