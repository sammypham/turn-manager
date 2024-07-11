import React, { createContext, useState } from 'react';
import useFetchUser from '../utils/useFetchUser';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { user, refreshUser, userLoading } = useFetchUser();

    return (
        <UserContext.Provider value={{ user, refreshUser, userLoading }}>
            {children}
        </UserContext.Provider>
    );
};
