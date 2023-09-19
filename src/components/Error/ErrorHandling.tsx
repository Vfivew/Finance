import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

interface ErrorHandlingProps {
  error: FetchBaseQueryError | any; 
}

const ErrorHandling: React.FC<ErrorHandlingProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  if (error.status === 429) {
    return <p>Error: Too many requests. Please try again later.</p>;
  }
  
  return <p>Error. Maybe this ticker does not exist</p>;
};

export default ErrorHandling;
