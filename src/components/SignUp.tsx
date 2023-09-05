import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form } from './Form';
import { setUser } from '../store/slice/userSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        user.getIdToken().then((token) => {
          console.log('User is registered with token:', token);
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: token,
            })
          );

          navigate('/');
        });
      })
      .catch((error) => {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
          setError('Дана поштова адреса вже зареєстрована.');
        } else {
          setError('Помилка реєстрації.');
        }
      });
  };

  return (
    <div>
      <Form title="register" handleClick={handleRegister} isRegistrationPage={true}/>
      {error && <p>{error}</p>}
    </div>
  );
};

export { SignUp };