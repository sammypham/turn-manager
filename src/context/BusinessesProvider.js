import React, { createContext, useState, useContext } from 'react';
import useFetchBusinesses from '../utils/useFetchBusinesses';
import { useParams } from 'react-router-dom';

export const BusinessesContext = createContext();

export const BusinessesProvider = ({ children }) => {
    const { businesses, refreshBusinesses, currentBusiness, setCurrentBusiness, useFetchBusinessById } = useFetchBusinesses();

    return (
        <BusinessesContext.Provider value={{ businesses, refreshBusinesses, currentBusiness, setCurrentBusiness, useFetchBusinessById }}>
            {children}
        </BusinessesContext.Provider>
    );
};
