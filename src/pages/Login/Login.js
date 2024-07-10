import "./Login.css"
import GoogleIcon from "../../components/GoogleIcon/GoogleIcon.js";

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-title">
                TurnManager.app
            </div>
            <div className="login-header">
                Sign In
            </div>
            <GoogleIcon href={`${process.env.REACT_APP_APP_URL}:${process.env.REACT_APP_SERVER_PORT}/auth/google`} />
        </div>
    );
};

export default Login;