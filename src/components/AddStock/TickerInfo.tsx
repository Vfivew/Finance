import { apiKey } from '../../store/slice/apiSlice';

interface TickerInfoProps {
  tickerInfo: {
    results: {
      ticker: string;
      description: string;
      market_cap: string;
      share_class_shares_outstanding: string;
      type: string;
      homepage_url: string;
      branding?: {
        logo_url?: string;
      };
    };
  };
}

const TickerInfo: React.FC<TickerInfoProps> = ({ tickerInfo }) => {
  

return (
  <div>
    <div>
      <h2 className="font-bold text-size18">Ticker information:</h2>
      <div>
        {tickerInfo.results.branding && tickerInfo.results.branding.logo_url ? (
          <img
            src={`${tickerInfo.results.branding.logo_url}?apiKey=${apiKey}`}
            alt="Logo"
            className="w-50 h-20" 
          />
        ) : null}
        <p className="text-size14">Ticker: {tickerInfo.results.ticker}</p>
        <p className="text-size14">Type: {tickerInfo.results.type}</p>
        {tickerInfo.results.homepage_url ? (
          <a href={tickerInfo.results.homepage_url}
            className="text-size14 hover:text-first focus:text-first"
          >
            {tickerInfo.results.homepage_url}
          </a>
        ) : null}
        <p className="text-size14">
          Description: {tickerInfo.results.description || 'No information found'}
        </p>
        <p className="text-size14">
          Market cap: {tickerInfo.results.market_cap
            ? `${parseFloat(tickerInfo.results.market_cap).toLocaleString()} USD`
            : 'No information found'}
        </p>
        <p className="text-size14">
          Share Class Shares Outstanding: {tickerInfo.results.share_class_shares_outstanding
            ? parseFloat(tickerInfo.results.share_class_shares_outstanding).toLocaleString()
            : 'No information found'}
        </p>
      </div>
    </div>
  </div>
);
};

export default TickerInfo;
