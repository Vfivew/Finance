import { FC, useState } from 'react';
import ResetPasswordForm from './ResetPasswordForm'; 

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
    <div>
      {resetPassword ? (
        <ResetPasswordForm onResetPassword={handleResetPasswordCancel} />
      ) : (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          autoComplete="current-email"
        />
        <input
          type="password"
          value={pass}
          onChange={handlePasswordChange}
          placeholder="password"
          autoComplete="current-password"
        />
        {isRegistrationPage && (
          <>
            <input
              type="password"
              value={confirmPass}
              onChange={handleConfirmPasswordChange}
              placeholder="Повторіть пароль"
              autoComplete="current-password"
            />
            {error && <p>{error}</p>}
          </>
        )}
        <button type="submit" disabled={isRegistrationPage && pass !== confirmPass}>
          {title}
        </button>
        <button onClick={handleResetPasswordClick}>Forgot password?</button>
      </form>
      )}
    </div>
  );
};

export { Form };