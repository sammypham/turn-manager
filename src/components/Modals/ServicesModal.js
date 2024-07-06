import { useAddServicesModal } from "../../context/AddServicesModalProvider";
import AddServicesModal from "./AddServicesModal";

import CloseIcon from '@mui/icons-material/Close';

import useFetchService from "../../utils/useFetchService.js"
import { useState } from "react";

const ServicesModal = ({ isOpen, onClose }) => {
    const { addServicesModalOpen, openAddServicesModal, closeAddServicesModal, newServiceFormData, changes } = useAddServicesModal();

    const { services, refreshService } = useFetchService();

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

    const clickService = async(service) => {
        if (isSelectingEdit) {
            setIsSelectingEdit(false);
            openAddServicesModal(service);
        } else if (isSelectingDelete) {
            setIsSelectingDelete(false);
            const confirm = window.confirm(`WARNING: Do you want to delete ${service.name}?`)
            
            if (confirm) {
                console.log(`Deleted ${service.name}`);
                try {
                    const response = await fetch('/api/service', {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(service)
                    })
        
                    refreshService();
                } catch (error) {
                    console.error("Error:", error);
                    return [];
                }
            }
        }
    }

    const addService = async (event) => {

        try {
                const response = await fetch('/api/service', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newServiceFormData)
                })

                refreshService();
                closeAddServicesModal();
            } catch (error) {
                console.error("Error:", error);
                return [];
            }
        }
    

    const createServiceCard = (service, index) => {
  
        return (
            <button
                onClick={() => clickService(service)}
                className={`modal-card ${service.isHalfTurn ? "slashed" : ""}`}
                key={index}
                style={{ '--service-color': `${service.color}` }}
            >
                {service ? service.name : "Service Name"}
            </button>
        );
    };

    if (!isOpen) return null;

    return (
        <div
            className="modal-background"
        >
            <AddServicesModal isOpen={addServicesModalOpen} onClose={closeAddServicesModal} newServiceFormData={newServiceFormData} changes={changes} createServiceCard={createServiceCard} addService={addService} />
            <div className="modal-container services-modal-container">
                <div className="modal-header">
                    Services
                </div>
                <button onClick={onClose} className="close-button">
                    <CloseIcon />
                </button>
                <div className="modal-button-header">
                    <button onClick={() => openAddServicesModal()} className="modal-button add-service-button">
                        Add Service
                    </button>
                    <button onClick={activateSelectingEdit} className="modal-button edit-service-button">
                        Edit Service
                    </button>
                    <button onClick={activateSelectingDelete} className="modal-button delete-service-button">
                        Delete Service
                    </button>
                </div>
                {
                    isSelectingEdit
                    &&
                    <div>
                        Select A Service To Edit
                    </div>
                }
                {
                    isSelectingDelete
                    &&
                    <div>
                        Select A Service To Delete
                    </div>
                }
                <div className="modal-content-wrapper">
                    <div className="modal-content">
                        {services
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((service, index) =>
                                createServiceCard(service, index)
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesModal;