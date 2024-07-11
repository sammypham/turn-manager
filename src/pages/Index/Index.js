import React, { useContext } from 'react';
import './Index.css'; // Importing the CSS file
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';

const Index = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

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