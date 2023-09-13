import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slice/userSlice';
import { Navigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import UserStock from '../components/UserStock'
import { resetTicker } from '../store/slice/tickersSlice';
import Stock from '../components/StockDetails';
import StockExample from '../components/StockExample'

const HomePage = () => {
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
                {/* <Stock/> */}
            </section>
            <section>
                <button><Link  to="/addstock">Додати акції</Link></button>
            </section>
            <section>
                <UserStock />
                <StockExample/>
            </section>
        </section>
        
    ) : (
        <Navigate to="/register" /> 
    );
};

export default HomePage;