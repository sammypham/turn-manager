import React, { createContext, useState } from 'react';
import useFetchUser from '../utils/useFetchUser';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { user, refreshUser, userLoading, setUser } = useFetchUser();

    return (
        <UserContext.Provider value={{ user, refreshUser, userLoading, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
