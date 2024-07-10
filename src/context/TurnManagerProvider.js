import React, { createContext, useState } from 'react';



export const TurnManagerContext = createContext();

export const TurnManagerProvider = ({ children }) => {
    const [currentTechnician, setCurrentTechnician] = useState({});
    const [currentTurn, setCurrentTurn] = useState({});

    return (
        <TurnManagerContext.Provider value={{ currentTechnician, setCurrentTechnician, currentTurn, setCurrentTurn }}>
            {children}
        </TurnManagerContext.Provider>
    );
};
