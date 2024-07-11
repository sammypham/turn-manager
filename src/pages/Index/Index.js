import React from 'react';
import './Index.css'; // Importing the CSS file
import { NavLink, useNavigate } from 'react-router-dom';
import useFetchUser from '../../utils/useFetchUser';

const Index = () => {
    const navigate = useNavigate();
    const user = useFetchUser();

    if (user?.user) {
        navigate("/businesses");
    }

    return (
        <>
            <header className="index-page__header">
                <div className="index-page__logo">
                    TurnManager.app
                </div>
                <nav className="index-page__nav">
                    <NavLink to="/login" className="index-page__button">Sign In</NavLink>
                </nav>
            </header>
            <main className="index-page__main">
                <h1 className="index-page__title">Welcome to TurnManager.app</h1>
                <p className="index-page__description">
                    Efficiently manage your workplace and distribute productivity with our easy-to-use app.
                </p>
            </main>
        </>
    );
};

export default Index;