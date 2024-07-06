import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import { useState } from 'react';
import AddTechnicianModal from './AddTechnicianModal';
import { useAddTechnicianModal } from '../../context/AddTechnicianProvider';
import useFetchTech from "../../utils/useFetchTech.js"

const SignInModal = ({ isOpen, onClose }) => {
    const { addTechnicianModalOpen, newTechnicianFormData, openAddTechnicianModal, closeAddTechnicianModal, changes } = useAddTechnicianModal();
    const { technicians, refreshTechnician } = useFetchTech();
    const [isSelectingEdit, setIsSelectingEdit] = useState(false);
    const [isSelectingDelete, setIsSelectingDelete] = useState(false);

    const activateSelectingEdit = () => {
        setIsSelectingEdit(!isSelectingEdit);
        setIsSelectingDelete(false);
    }

    const activateSelectingDelete = () => {
        setIsSelectingDelete(!isSelectingDelete);
        setIsSelectingEdit(false);
    }

    const clickTechnician = async(technician) => {
        if (isSelectingEdit) {
            setIsSelectingEdit(false);
            openAddTechnicianModal(technician);
        } else if (isSelectingDelete) {
            setIsSelectingEdit(false);
            console.log(technician)
            const confirm = window.confirm(`WARNING: Are you sure you want to delete ${technician.name}`)
            if (confirm) {
                console.log(`Deleted ${technician.name}`);
                try {
                    const response = await fetch('/api/tech', {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(technician)
                    })
        
                    refreshTechnician();
                } catch (error) {
                    console.error("Error:", error);
                    return [];
                }
            }
        }
    }

    const createTechnicianCard = (technician, index) => {
        return (
            <button
                onClick={() => clickTechnician(technician)}
                className="modal-card" key={index}>
                {technician ? technician.name : "Technician Name"}
            </button>
        )
    }

    const addTech = async (event) => {

        try {
                const response = await fetch('/api/tech', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTechnicianFormData)
                })

                refreshTechnician();
                closeAddTechnicianModal();
            } catch (error) {
                console.error("Error:", error);
                return [];
        }
    }
    if (!isOpen) { return null; }

    return (
        <div
            className="modal-background"
        >
            <AddTechnicianModal isOpen={addTechnicianModalOpen} onClose={closeAddTechnicianModal} formData={newTechnicianFormData} changes={changes} addTech={addTech} />
            <div className="modal-container technicians-modal-container">
                <div className="modal-header">
                    Technicians
                </div>
                <button onClick={onClose} className="close-button">
                    <CloseIcon />
                </button>
                <div
                    className="modal-button-header">
                    <button
                        onClick={() => openAddTechnicianModal()}
                        className="modal-button add-service-button">
                        Add Technician
                    </button>
                    <button
                        onClick={activateSelectingEdit}
                        className="modal-button edit-service-button">
                        Edit Technician
                    </button>
                    <button
                        onClick={activateSelectingDelete}
                        className="modal-button delete-service-button">
                        Delete Technician
                    </button>
                </div>
                {
                    isSelectingEdit
                    &&
                    <div>
                        Select A Technician To Edit
                    </div>
                }
                {
                    isSelectingDelete
                    &&
                    <div>
                        Select A Technician To Delete
                    </div>
                }
                <div className="modal-content-wrapper">
                    <div className="modal-content">
                        {technicians
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((technician, index) =>
                                createTechnicianCard(technician, index)
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInModal;