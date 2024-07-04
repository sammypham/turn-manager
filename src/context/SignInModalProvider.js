import React, { createContext, useState, useContext } from 'react';

// Create Context
const SignInModalContext = createContext();

// Create Provider
export const SignInModalProvider = ({ children }) => {
    const [signInModalOpen, setSignInModalOpen] = useState(false);

    const openSignInModal = () => {
        setSignInModalOpen(true);
    };

    const closeSignInModal = () => {
        setSignInModalOpen(false);
    };

    return (
        <SignInModalContext.Provider value={{ signInModalOpen, openSignInModal, closeSignInModal }}>
            {children}
        </SignInModalContext.Provider>
    );
};

// Custom hook to use the modal context
export const useSignInModal = () => {
    return useContext(SignInModalContext);
};
