import React, { createContext, useState, useContext } from 'react';
import useFetchBusinesses from '../utils/useFetchBusinesses';

export const BusinessesContext = createContext();

export const BusinessesProvider = ({ children }) => {
    const { businesses, refreshBusinesses, currentBusiness, refreshCurrentBusinesses } = useFetchBusinesses();

    return (
        <BusinessesContext.Provider value={{ businesses, refreshBusinesses, currentBusiness, refreshCurrentBusinesses }}>
            {children}
        </BusinessesContext.Provider>
    );
};
