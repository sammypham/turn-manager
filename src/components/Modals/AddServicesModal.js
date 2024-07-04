import CloseIcon from '@mui/icons-material/Close';

import Checkbox from '@mui/material/Checkbox';
import { CirclePicker } from 'react-color';

const AddServicesModal = ({ isOpen, onClose, newServiceFormData, changes, createServiceCard, addService }) => {
    if (!isOpen) return null;

    return (
        <div
            className="modal-background"
        >
            <div className="modal-container add-service-modal-container">
                <div className="modal-header">
                    Add New Service
                </div>
                <button onClick={onClose} className="close-button">
                    <CloseIcon />
                </button>
                <div className="modal-form-wrapper">
                    Service Name:
                    <input
                        className="modal-form-input"
                        placeholder="New Service Name (required)"
                        value={newServiceFormData.name}
                        onChange={changes.changeServiceName}
                    />
                    <div style={{ margin: "0px 0px" }}>
                        Half Turn:
                        <Checkbox
                            checked={newServiceFormData.isHalfTurn}
                            onChange={changes.changeHalf}
                        />
                    </div>
                    <div style={{ display: "flex", margin: "20px", justifyContent: "center" }}>
                        <CirclePicker
                            color={newServiceFormData.color}
                            onChange={changes.changeColor}
                        />
                    </div>
                    <div style={{ display: "flex", margin: "20px", justifyContent: "center" }}>
                        {createServiceCard(newServiceFormData, 0)}
                    </div>
                </div>
                <button onClick={addService} className="modal-button add-service-button" style={{ margin: "20px 0px", marginLeft: "auto" }}>
                    Add Service
                </button>
            </div>
        </div>
    )
}

export default AddServicesModal;