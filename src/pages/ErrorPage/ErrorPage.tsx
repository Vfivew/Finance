import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <div className='error-block flex flex-col text-center p-8 bg-fourth-color'>
      <h2 className='text-red-500 text-5xl'>Error 404</h2>
      <p className='text-secondary-size'>
        Sorry, but the page you are looking for does not exist.
      </p>
      <p>
        Please check the URL or go back to{' '}
        <a className='font-bold hover:text-primary-color focus:text-primary-color' href='/'>
          Main page
        </a>
        .
      </p>
    </div>
  );
};

export default ErrorPage;