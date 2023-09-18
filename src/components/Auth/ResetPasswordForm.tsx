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
    <div className="bg-thirty py-10 px-8 pb-10 rounded-xl shadow-md border border-white">
      {resetSent ? (
        <p>Password update instructions have been sent to your email.</p>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <p className='m-2'>Enter your email to update your password.</p>
            <input
            className='w-full p-2 m-2 rounded border-2 border-darkBlue focus:outline-none focus:ring focus:border-blue-200'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            />
          <div className='flex items-center justify-center'>
            <button className='base-btn m-2' onClick={handleResetPassword}>Сhange password</button>
            <button className='base-btn m-2' onClick={onResetPassword}>Cancel</button>
          </div>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;