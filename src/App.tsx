import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddStock from './components/AddStock/AddStock';
import StockDetails from './components/StockGraph/StockDetails'
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ResetPasswordPage from './pages/ResetPassword';

function PrivateRoute({ element }: any) {
  const { isAuth } = useAuth();

  return isAuth ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/resetpassword" element={<ResetPasswordPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route
        path="/addstock"
        element={<PrivateRoute element={<AddStock />} />}
      />
      <Route
        path="/stock/:ticker"
        element={<PrivateRoute element={<StockDetails />} />}
      />
    </Routes>
  );
}

export default App;