import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { removeUser } from '../store/slice/userSlice';
import { Navigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { resetTicker } from '../store/slice/tickersSlice';

import UserStock from '../components/UserStock'

const HomePage:React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth, email } = useAuth();

    const handleLogout = () => {
        dispatch(removeUser());
        dispatch(resetTicker());
        navigate('/login');
    };

    return isAuth ? (
        <section>
            <section>
                <h1>Welcome</h1>
                <button onClick={handleLogout}>Log out from {email}</button>
            </section>
            <section>
                <button><Link  to="/addstock">Add Stock</Link></button>
            </section>
            <section>
                <UserStock />
            </section>
        </section>
        ) : (
            <Navigate to="/register" /> 
        );
};

export default HomePage;