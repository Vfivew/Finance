interface TickerInfoProps {
  tickerInfo: {
    results: {
      ticker: string;
      description: string;
    };
  };
}

const TickerInfo: React.FC<TickerInfoProps> = ({ tickerInfo }) => {
  return (
    <div>
      <div>
        <h2>Ticker information:</h2>
          <div>
            <p>Ticker: {tickerInfo.results.ticker}</p>
            <p>Description: {tickerInfo.results.description}</p>
          </div>
      </div>
    </div>
  );
};

export default TickerInfo;
