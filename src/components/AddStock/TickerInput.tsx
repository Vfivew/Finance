interface TickerInputProps {
  tickerInput: string;
  selectedDate: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGetTickerInfo: () => void;
}

const TickerInput: React.FC<TickerInputProps> = ({ tickerInput, selectedDate, onInputChange, onGetTickerInfo }) => {
  return (
    <div>
      <label>Enter the ticker name </label>
      <input
        type="text"
        value={tickerInput}
        onChange={onInputChange}
        className="text-size14 text-black p-1 m-4 rounded border-2 border-fifth focus:outline-none focus:ring focus:border-blue-200"
      />
      <input
        type="date"
        value={selectedDate}
        onChange={onInputChange}
        lang="en"
        className="text-size14 text-black p-1 m-4 rounded border-2 border-fifth focus:outline-none focus:ring focus:border-blue-200"
      />
      <button
        onClick={onGetTickerInfo}
        className="base-btn">
        Click to follow
      </button>
      <span className="m-2">
        Consider the maximum possible range - 2 years!
      </span>
    </div>
  );
};

export default TickerInput;
