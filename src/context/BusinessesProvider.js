import React, { createContext } from 'react';
import useFetchBusinesses from '../utils/useFetchBusinesses';

export const BusinessesContext = createContext();

export const BusinessesProvider = ({ children }) => {
    const { businesses, refreshBusinesses, currentBusiness, setCurrentBusiness, getBusinessById } = useFetchBusinesses();

    return (
        <BusinessesContext.Provider value={{ businesses, refreshBusinesses, currentBusiness, setCurrentBusiness, getBusinessById }}>
            {children}
        </BusinessesContext.Provider>
    );
};
