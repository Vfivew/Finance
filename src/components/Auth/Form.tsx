import React, { FC, useState } from 'react';
import ResetPasswordForm from './ResetPasswordForm'

interface FormProps {
  title: string;
  isRegistrationPage: boolean;
  handleClick: (email: string, pass: string) => void;
}

const Form: FC<FormProps> = ({ title, isRegistrationPage, handleClick }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [resetPassword, setResetPassword] = useState(false);

  const handleResetPasswordClick = () => {
    setResetPassword(true);
  };

  const handleResetPasswordCancel = () => {
    setResetPassword(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPass(newPassword);
    validatePasswords(newPassword, confirmPass);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const repeatedPassword = e.target.value;
    setConfirmPass(repeatedPassword);
    validatePasswords(pass, repeatedPassword);
  };

  const validatePasswords = (password: string, repeatedPassword: string) => {
    if (isRegistrationPage && password !== repeatedPassword) {
      setError('Passwords do not match');
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegistrationPage && pass !== confirmPass) {
      setError('Passwords do not match');
    } else {
      setError(null);
      handleClick(email, pass);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      {resetPassword ? (
        <ResetPasswordForm onResetPassword={handleResetPasswordCancel} />
      ) : (
        <form onSubmit={handleSubmit} className="bg-thirty py-10 px-8 pb-10 rounded-xl shadow-md border border-white">
          <p>Login</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 mb-4 rounded border-2 border-fifth focus:outline-none focus:ring focus:border-blue-200"
            autoComplete="current-email"
          />
          <p>Password</p>
          <input
            type="password"
            value={pass}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="w-full p-2 mb-4 rounded border-2 border-fifth focus:outline-none focus:ring focus:border-blue-200"
            autoComplete="current-password"
          />
          {isRegistrationPage && (
            <>
              <input
                type="password"
                value={confirmPass}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm Password"
                className="w-full p-2 mb-4 rounded border-2 border-fifth focus:outline-none focus:ring focus:border-blue-200"
                autoComplete="current-password"
              />
              {error && <p className="text-red-600">{error}</p>}
            </>
          )}
          <div className='flex items-center justify-center space-x-4'>
            <button
              type="submit"
              disabled={isRegistrationPage && pass !== confirmPass}
              className="base-btn"
            >
              {title}
            </button>
            <button
              onClick={handleResetPasswordClick}
              className="base-btn"
            >
              Forgot password?
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export { Form };
