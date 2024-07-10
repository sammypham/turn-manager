import "./Login.css"
import GoogleIcon from "../../components/GoogleIcon/GoogleIcon.js";


const Login = () => {
    return (
        <div className="login-container">
            <div className="login-title">
                TurnManager
            </div>
            <div className="login-header">
                Sign In
            </div>
            <GoogleIcon href="http://localhost:4000/auth/google">
      
                </GoogleIcon>
        </div>
    );
};

export default Login;