import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slice/userSlice';
import { Navigate } from 'react-router-dom'; 
import Stock from '../components/Stock';
import AddStock from '../components/AddStock'

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth, email } = useAuth();

    const handleLogout = () => {
        dispatch(removeUser());
        navigate('/login');
    };

    return isAuth ? (
        <div>
            <h1>Welcome</h1>
            <button onClick={handleLogout}>Log out from {email}</button>
            {/* <Stock/> */}
            <AddStock/>
        </div>
    ) : (
        <Navigate to="/register" /> 
    );
};

export default HomePage;