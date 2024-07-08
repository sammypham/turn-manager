import React, { createContext, useState, useContext } from 'react';

// Create Context
const AddTechnicianModalContext = createContext();

// Create Provider
export const AddTechnicianModalProvider = ({ children }) => {
    const [addTechnicianModalOpen, setAddTechnicianModalOpen] = useState(false);

    const newTechnicianFormEmpty = {
        name: "",
        pin: "",
        confirmPin: ""
    }

    const [newTechnicianFormData, setNewTechnicianFormData] = useState(newTechnicianFormEmpty);

    const openAddTechnicianModal = (technicianFormData) => {
        setAddTechnicianModalOpen(true);
        if (technicianFormData) {
            setNewTechnicianFormData({
                ...technicianFormData,
                isEditing: true
            });
        }
    };

    const closeAddTechnicianModal = () => {
        setAddTechnicianModalOpen(false);
        setNewTechnicianFormData(newTechnicianFormEmpty);
    };

    const changeTechnicianName = (event) => {
        setNewTechnicianFormData(
            {
                ...newTechnicianFormData,
                name: event.target.value
            }
        )
    }

    const changePin = (event) => {
        setNewTechnicianFormData(
            {
                ...newTechnicianFormData,
                pin: event.target.value
            }
        )
    }

    const changeConfirmPin = (event) => {
        setNewTechnicianFormData(
            {
                ...newTechnicianFormData,
                confirmPin: event.target.value
            }
        )
    }

    const changes = {
        changeTechnicianName: changeTechnicianName,
        changePin: changePin,
        changeConfirmPin: changeConfirmPin
    }

    return (
        <AddTechnicianModalContext.Provider value={{ addTechnicianModalOpen, newTechnicianFormData, openAddTechnicianModal, closeAddTechnicianModal, changes }}>
            {children}
        </AddTechnicianModalContext.Provider>
    );
};

// Custom hook to use the modal context
export const useAddTechnicianModal = () => {
    return useContext(AddTechnicianModalContext);
};
