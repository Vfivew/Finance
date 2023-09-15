import './ErrorPage.css';

const ErrorPage: React.FC = () => {
    return (
    <div className='error-block'>
      <h2>Error 404</h2>
      <p>Sorry, but the page you are looking for does not exist.</p>
      <p>Please check the URL or go back to<a href="/">Main page</a>.</p>
    </div>
    );
};

export default ErrorPage;