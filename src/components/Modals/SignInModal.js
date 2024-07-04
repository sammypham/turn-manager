import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import { useState } from 'react';
import AddTechnicianModal from './AddTechnicianModal';
import { useAddTechnicianModal } from '../../context/AddTechnicianProvider';

const technicians = [
    {
        name: "Bob",
        turns: ["Manicure", "Pedicure"]
    },
    {
        name: "Alice",
        turns: ["Acrylic Nails", "Gel Nails"]
    },
    {
        name: "Charlie",
        turns: ["Pedicure", "Nail Art"]
    },
    {
        name: "Diana",
        turns: ["Manicure", "Acrylic Nails"]
    },
    {
        name: "Eve",
        turns: ["Gel Nails", "Nail Art"]
    },
    {
        name: "Frank",
        turns: ["Manicure", "Pedicure"]
    },
    {
        name: "Grace",
        turns: ["Acrylic Nails", "Gel Nails"]
    },
    {
        name: "Hank",
        turns: ["Pedicure", "Nail Art"]
    },
    {
        name: "Ivy",
        turns: ["Manicure", "Nail Art"]
    },
    {
        name: "Jack",
        turns: ["Gel Nails", "Manicure"]
    },
    {
        name: "Karen",
        turns: ["Acrylic Nails", "Pedicure"]
    },
    {
        name: "Leo",
        turns: ["Gel Nails", "Nail Art"]
    },
    {
        name: "Mia",
        turns: ["Manicure", "Acrylic Nails"]
    },
    {
        name: "Nina",
        turns: ["Pedicure", "Gel Nails"]
    },
    {
        name: "Oscar",
        turns: ["Manicure", "Nail Art"]
    },
];

const SignInModal = ({ isOpen, onClose }) => {
    const { addTechnicianModalOpen, newTechnicianFormData, openAddTechnicianModal, closeAddTechnicianModal, changes } = useAddTechnicianModal();

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

    const clickTechnician = (technician) => {
        if (isSelectingEdit) {
            setIsSelectingEdit(false);
            openAddTechnicianModal(technician);
        } else if (isSelectingDelete) {
            setIsSelectingEdit(false);

            const confirm = window.confirm(`WARNING: Are you sure you want to delete ${technician.name}`)
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

    if (!isOpen) { return null; }

    return (
        <div
            className="modal-background"
        >
            <AddTechnicianModal isOpen={addTechnicianModalOpen} onClose={closeAddTechnicianModal} formData={newTechnicianFormData} changes={changes} />
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
                        onClick={openAddTechnicianModal}
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