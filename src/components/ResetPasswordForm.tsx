import React, { FC, useState } from 'react';
import { getAuth, sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';

interface ResetPasswordFormProps {
  onResetPassword: () => void;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ onResetPassword }) => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    try {
      const auth = getAuth();
      
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.length === 0) {
        setError('Користувач з цим email не знайдений.');
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError(null);
    } catch (error) {
      setError('Помилки при відправці запиту на оновлення пароля.');
    }
  };

  return (
    <div>
      {resetSent ? (
        <p>Інструкція по оновленню паролю відправлена на ваш email.</p>
      ) : (
        <div>
          <p>Введіть ваш email для оновлення паролю.</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <button onClick={handleResetPassword}>Оновити пароль</button>
          <button onClick={onResetPassword}>Скасувати</button>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;