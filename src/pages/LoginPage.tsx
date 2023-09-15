import { Link } from 'react-router-dom';
import { Login } from '../components/Login';

const LoginPage:React.FC = () => {
    return (
        <div>
            <h1>Login</h1>
                <Login />
            <p>
                Or <Link to="/register">Register</Link>
            </p>
        </div>
    )
}

export default LoginPage