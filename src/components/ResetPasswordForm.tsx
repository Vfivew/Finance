import { FC, useState } from 'react';
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
        setError('User with this email was not found.');
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError(null);
    } catch (error) {
      setError('Errors when sending a password update request.');
    }
  };

  return (
    <div>
      {resetSent ? (
        <p>Password update instructions have been sent to your email.</p>
      ) : (
        <div>
          <p>Enter your email to update your password.</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <button onClick={handleResetPassword}>Сhange password</button>
          <button onClick={onResetPassword}>Cancel</button>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;