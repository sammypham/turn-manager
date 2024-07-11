import "./Login.css"
import GoogleIcon from "../../components/GoogleIcon/GoogleIcon.js";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserProvider.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const { user, refreshUser, setUser } = useContext(UserContext);

    const callbackURL = process.env.NODE_ENV === 'development'
        ? `${process.env.REACT_APP_APP_URL}:${process.env.REACT_APP_SERVER_PORT}/auth/google`
        : `${process.env.REACT_APP_APP_URL}/auth/google`

    useEffect(() => {
        refreshUser();
        if (user) {
            navigate("/businesses");
        }
    }, [])

    useEffect(() => {
        if (user) {
            navigate("/businesses");
        }
    }, [user])


    const demoLogin = async() => {
            try {
                const response = await fetch(`/api/demo`, {
                    method: "GET",
                    credentials: "same-origin", // Ensure cookies (session) are sent with the request
                })

                const responseData = await response;

                if (response.ok) {
                    setUser(1);
                }
            } catch (error) {
                console.error(error);
            }
    }

    return (
        <div className="login-container">
            <div className="login-title">
                TurnManager.app
            </div>
            <div className="login-header">
                Sign In
            </div>
            <GoogleIcon href={callbackURL} />
            <button className="demo-account-button" onClick={demoLogin} >
                USE DEMO ACCOUNT
            </button>
        </div>
    );
};

export default Login;