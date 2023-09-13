import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './hooks/use-auth';
import AddStock from './components/AddStock';
import StockDetails from './components/StockDetails'

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
      <Route
        path="/addstock"
        element={<PrivateRoute element={<AddStock />} />} 
      />
      <Route
        path="/stock/:ticker"
        element={<PrivateRoute element={<StockDetails/>} />} 
      />
    </Routes>
  );
}

export default App;