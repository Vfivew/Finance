import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form } from './Form';
import { setUser } from '../../store/slice/userSlice';

const SignUp: FC = () => {
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
          setError('This postal address is already registered.');
        } else {
          setError('Registration error, try later.');
        }
      });
  };

  return (
    <div>
      <Form title="Register" handleClick={handleRegister} isRegistrationPage={true}/>
      {error && <p>{error}</p>}
    </div>
  );
};

export { SignUp };