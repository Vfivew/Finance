import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

interface ErrorHandlingProps {
  error: FetchBaseQueryError | any; 
}

const ErrorHandling: React.FC<ErrorHandlingProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  if (error.status === 429) {
    return <p>Ошибка: Слишком много запросов. Пожалуйста, попробуйте позже.</p>;
  }
  return <p>Ошибка запроса: Произошла ошибка.</p>;
};

export default ErrorHandling;
