import "./Login.css"
import GoogleIcon from "../../components/GoogleIcon/GoogleIcon.js";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserProvider.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const { user, refreshUser } = useContext(UserContext);

    const callbackURL = process.env.NODE_ENV === 'development'
        ? `${process.env.REACT_APP_APP_URL}:${process.env.REACT_APP_SERVER_PORT}/auth/google`
        : `${process.env.REACT_APP_APP_URL}/auth/google`

    useEffect(() => {
        refreshUser();
    }, [])

    useEffect(() => {
        if (user) {
            navigate("/businesses");
        }
    }, [user])


    const demoLogin = async() => {
            try {
                const response = await fetch(`http://localhost:4000/api/demo`, {
                    method: "GET",
                    credentials: "include", // Ensure cookies (session) are sent with the request
                })

                const responseData = await response;
                console.log("test")
                if (response.ok) {
                    navigate(`/businesses`);
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