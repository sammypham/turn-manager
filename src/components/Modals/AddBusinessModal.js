import CloseIcon from '@mui/icons-material/Close';

import Checkbox from '@mui/material/Checkbox';
import { useContext, useState } from 'react';
import { CirclePicker } from 'react-color';
import { BusinessesContext } from '../../context/BusinessesProvider';

const AddBusinessModal = ({ isOpen, onClose }) => {
    const { refreshBusinesses } = useContext(BusinessesContext);

    const [formData, setFormData] = useState({});

    if (!isOpen) {
        return null
    };

    const onNameChange = (event) => {
        setFormData(
            {
                ...formData,
                name: event.target.value
            }
        )
    }

    const addBusiness = async () => {
        try {
            const response = await fetch('/api/business', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const responseData = await response.json()

            if (response.ok) {
                refreshBusinesses();
                onClose();
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            className="modal-background"
        >
            <div className="modal-container add-service-modal-container">
                <div className="modal-header">
                    Add New Business
                </div>
                <button onClick={onClose} className="close-button">
                    <CloseIcon />
                </button>
                <div className="modal-form-wrapper">
                    Business Name:
                    <input
                        className="modal-form-input"
                        placeholder="New Service Name (required)"
                        value={formData.name}
                        onChange={onNameChange}
                    />
                </div>
                <button onClick={addBusiness} className="modal-button add-service-button" style={{ margin: "20px 0px", marginLeft: "auto" }}>
                    Add Business
                </button>
            </div>
        </div>
    )
}

export default AddBusinessModal;