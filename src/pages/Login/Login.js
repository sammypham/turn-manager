import "./Login.css"
import GoogleIcon from "../../components/GoogleIcon/GoogleIcon.js";

const Login = () => {
    const callbackURL = process.env.NODE_ENV === 'development'
        ? `${process.env.REACT_APP_APP_URL}:${process.env.REACT_APP_SERVER_PORT}/auth/google`
        : `${process.env.REACT_APP_APP_URL}/auth/google`

    return (
        <div className="login-container">
            <div className="login-title">
                TurnManager.app
            </div>
            <div className="login-header">
                Sign In
            </div>
            <GoogleIcon href={callbackURL} />
        </div>
    );
};

export default Login;