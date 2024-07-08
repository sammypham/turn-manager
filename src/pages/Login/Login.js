import "./Login.css"

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-title">
                TurnManager
            </div>
            <div className="login-header">
                Sign In
            </div>
            <a href="http://localhost:4000/auth/google">
                Sign In w/ Google
            </a>
        </div>
    );
};

export default Login;