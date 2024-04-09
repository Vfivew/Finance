import { FC, useState } from "react";
import {
  getAuth,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

const ResetPasswordForm: FC = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    try {
      const auth = getAuth();

      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.length === 0) {
        setError("User with this email was not found.");
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError(null);
    } catch (error) {
      setError("Errors when sending a password update request.");
    }
  };

  const handleSend = () => {
    if (email !== "") {
      handleResetPassword();
    } else {
      setError("Fill input!");
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-thirty py-10 px-8 pb-10 rounded-xl shadow-md border border-white">
        {resetSent ? (
          <p>Password update instructions have been sent to your email.</p>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="m-2">Enter your email to update your password.</p>
            <input
              className="w-full p-2 m-2 text-black rounded border-2 border-darkBlue focus:outline-none focus:ring focus:border-blue-200"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <div className="flex items-center justify-center">
              <button className="base-btn m-2" onClick={handleSend}>
                Сhange password
              </button>
              <button onClick={handleBack} className="base-btn m-2">
                Back
              </button>
            </div>
            {error && (
              <p className="text-red-300 mt-4 font-bold text-center">{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
