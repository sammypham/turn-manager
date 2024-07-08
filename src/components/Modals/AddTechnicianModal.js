import CloseIcon from '@mui/icons-material/Close';

const AddTechnicianModal = ({ isOpen, onClose, formData, changes, addTech }) => {
    if (!isOpen) { return null; };

    return (
        <div className="modal-background">
            <div className="modal-container add-new-tech-container">
                <div className="modal-header">
                    Add New Technician
                </div>
                <button onClick={onClose} className="close-button">
                    <CloseIcon />
                </button>
                <div className="modal-form-wrapper">
                    Technician Name:
                    <input
                        className="modal-form-input"
                        placeholder="New Technician Name (required)"
                        value={formData.name}
                        onChange={changes.changeTechnicianName}
                    />
                    Technician Pin:
                    <input
                        type="password"
                        className="modal-form-input"
                        placeholder="Technician Pin (required)"
                        value={formData.pin}
                        onChange={changes.changePin}
                    />
                    Confirm Pin:
                    <input
                        type="password"
                        className="modal-form-input"
                        placeholder="Confirm Pin (required)"
                        value={formData.confirmPin}
                        onChange={changes.changeConfirmPin}
                    />
                </div>
                <button onClick={addTech} className="modal-button add-service-button" style={{ margin: "20px 0px", marginLeft: "auto" }}>
                    Add Technician
                </button>
            </div>
        </div>
    )
}

export default AddTechnicianModal;