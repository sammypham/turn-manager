import React, { createContext, useState, useContext } from 'react';

// Create Context
const AddServicesModalContext = createContext();

// Create Provider
export const AddServicesModalProvider = ({ children }) => {
    const [addServicesModalOpen, setAddServicesModalOpen] = useState(false);

    const newServiceFormEmpty = {
        name: "",
        abbreviation: "",
        color: "#FFFFFF",
        isHalfTurn: false
    }

    const [newServiceFormData, setNewServiceFormData] = useState(newServiceFormEmpty);

    const openAddServicesModal = (serviceFormData) => {
        setAddServicesModalOpen(true);
        if (serviceFormData) {
            setNewServiceFormData({
                ...serviceFormData,
                isEditing: true
            });
        }
    };

    const closeAddServicesModal = () => {
        setAddServicesModalOpen(false);
        setNewServiceFormData(newServiceFormEmpty);
    };

    const changeServiceName = (event) => {
        setNewServiceFormData(
            {
                ...newServiceFormData,
                name: event.target.value
            }
        )
    }

    const changeHalf = (event) => {
        setNewServiceFormData(
            {
                ...newServiceFormData,
                isHalfTurn: event.target.checked
            }
        )
    }

    const changeColor = (color) => {
        setNewServiceFormData(
            {
                ...newServiceFormData,
                color: color.hex
            }
        )
    }

    const changes = {
        changeServiceName: changeServiceName,
        changeHalf: changeHalf,
        changeColor: changeColor
    }

    return (
        <AddServicesModalContext.Provider value={{ addServicesModalOpen, newServiceFormData, openAddServicesModal, closeAddServicesModal, changes }}>
            {children}
        </AddServicesModalContext.Provider>
    );
};

// Custom hook to use the modal context
export const useAddServicesModal = () => {
    return useContext(AddServicesModalContext);
};
