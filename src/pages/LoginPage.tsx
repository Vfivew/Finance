import { Link } from 'react-router-dom';
import { Login } from '../components/Auth/Login';

const LoginPage: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <Login />
        <Link
          className="base-btn mt-4"
          to="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
