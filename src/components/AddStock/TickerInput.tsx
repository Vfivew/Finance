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
      <input type="text" value={tickerInput} onChange={onInputChange} />
      <input type="date" value={selectedDate} onChange={onInputChange} />
      <button onClick={onGetTickerInfo}>Click to follow</button>
    </div>
  );
};

export default TickerInput;
