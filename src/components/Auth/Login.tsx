import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { setUser } from "../../store/slice/userSlice";

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        user.getIdToken().then((token) => {
          localStorage.setItem("userToken", token);
          dispatch(
            setUser({
              email: user.email || "",
              id: user.uid,
              token: token,
            })
          );
          navigate("/");
        });
      })
      .catch((error) => {
        console.error(error);
        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
          setError("Invalid login or password.");
        } else {
          setError("Login error try later.");
        }
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (pass !== "" && email !== "") {
      handleLogin(email, pass);
    } else {
      setError("Fill all input");
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
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          className="w-full text-black p-2 mb-4 rounded border-2 border-fifth focus:outline-none focus:ring focus:border-blue-200"
          autoComplete="current-password"
        />
        <div className="flex items-center justify-center space-x-4">
          <button className="base-btn" type="submit">
            Login
          </button>
          <a className="base-btn" href="/resetpassword">
            Forgot password?
          </a>
        </div>
        {error && (
          <p className="text-red-300 mt-4 font-bold text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export { Login };
