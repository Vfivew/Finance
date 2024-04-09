import { Link } from "react-router-dom";

import ResetPasswordForm from "../components/Auth/ResetPasswordForm";

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <ResetPasswordForm />
        <Link className="base-btn mt-4" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
