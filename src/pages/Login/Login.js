import "./Login.css"
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {

    return (
        <div className="login-container">
            <div className="login-title">
                TurnTracker
            </div>
            <div className="login-header">
                Login / Sign Up
            </div>
            <p><a href="http://localhost:4000/auth/google">test</a></p>
            <div style={{ width: "300px" }}>
                <GoogleLogin />
            </div>
        </div>
    )
}

export default Login;