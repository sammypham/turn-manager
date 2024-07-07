import React, { createContext, useState } from 'react';

export const TurnManagerContext = createContext();

export const TurnManagerProvider = ({ children }) => {
    const [currentTechnician, setCurrentTechnician] = useState({});

    return (
        <TurnManagerContext.Provider value={{ currentTechnician, setCurrentTechnician }}>
            {children}
        </TurnManagerContext.Provider>
    );
};
