import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { setUser } from "../../store/slice/userSlice";

const SignUp: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        user.getIdToken().then((token) => {
          console.log("User is registered with token:", token);
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: token,
            })
          );

          navigate("/");
        });
      })
      .catch((error) => {
        console.error(error);
        if (error.code === "auth/email-already-in-use") {
          setError("This postal address is already registered.");
        } else {
          setError("Registration error, try later.");
        }
      });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPass(newPassword);
    validatePasswords(newPassword, confirmPass);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const repeatedPassword = e.target.value;
    setConfirmPass(repeatedPassword);
    validatePasswords(pass, repeatedPassword);
  };

  const validatePasswords = (
    password: string,
    repeatedPassword: string
  ): boolean => {
    return password !== repeatedPassword;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isInputFilled = email !== "" && pass !== "" && confirmPass !== "";

    if (!isInputFilled) {
      setError("Fill all input");
      return;
    } else if (!validatePasswords(email, pass)) {
      setError("Passwords do not match");
      return;
    } else {
      setError(null);
      handleRegister(email, pass);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-thirty py-10 px-8 pb-10 rounded-xl shadow-md border border-white"
      >
        <p>Login</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full text-black p-2 mb-4 rounded border-2 border-fifth focus:outline-none focus:ring focus:border-blue-200"
          autoComplete="current-email"
        />
        <p>Password</p>
        <input
          type="password"
          value={pass}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="w-full text-black p-2 mb-4 rounded border-2 border-fifth focus:outline-none focus:ring focus:border-blue-200"
          autoComplete="current-password"
        />
        <input
          type="password"
          value={confirmPass}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm Password"
          className="w-full text-black p-2 mb-4 rounded border-2 border-fifth focus:outline-none focus:ring focus:border-blue-200"
          autoComplete="current-password"
        />
        {error && (
          <p className="text-red-300 mt-4 font-bold text-center mb-4">
            {error}
          </p>
        )}
        <div className="flex items-center justify-center space-x-4">
          <button type="submit" className="base-btn">
            Register
          </button>
          <a className="base-btn" href="/resetpassword">
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
};

export { SignUp };
