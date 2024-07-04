import React, { createContext, useState, useContext } from 'react';

// Create Context
const ServicesModalContext = createContext();

// Create Provider
export const ServicesModalProvider = ({ children }) => {
    const [servicesModalOpen, setServicesModalOpen] = useState(false);

    const openServicesModal = () => {
        setServicesModalOpen(true);
    };

    const closeServicesModal = () => {
        setServicesModalOpen(false);
    };

    return (
        <ServicesModalContext.Provider value={{ servicesModalOpen, openServicesModal, closeServicesModal }}>
            {children}
        </ServicesModalContext.Provider>
    );
};

// Custom hook to use the modal context
export const useServicesModal = () => {
    return useContext(ServicesModalContext);
};
