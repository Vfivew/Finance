export const calculateProfitOrLoss = (purchasePrice: number, currentPrice?: number) => {
  if (typeof currentPrice === 'undefined') {
    return <span className="text-gray-500">Wait for data</span>;
  }

  const profitOrLoss = ((currentPrice - purchasePrice) / purchasePrice) * 100;
  const isProfit = profitOrLoss >= 0;
  const textColor = isProfit ? 'text-green-500' : 'text-red-500';

  return <span className={textColor}>{profitOrLoss.toFixed(2)}%</span>;
};