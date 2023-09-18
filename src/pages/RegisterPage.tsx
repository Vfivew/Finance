import { Link } from 'react-router-dom';

import { SignUp } from '../components/Auth/SignUp';

const RegisterPage:React.FC = () => {
    return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
            <SignUp />
            <p className='mt-2'> Already have an account?</p>
                <Link
                    className="base-btn mt-2"
                    to="/login">Sign in
                </Link>   
        </div>
    </div>
    )
}

export default RegisterPage