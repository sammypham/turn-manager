import { useAddServicesModal } from "../../context/AddServicesModalProvider";
import AddServicesModal from "./AddServicesModal";

import CloseIcon from '@mui/icons-material/Close';

import useFetchService from "../../utils/useFetchService.js"
import { useContext, useState } from "react";
import { BusinessesContext } from "../../context/BusinessesProvider.js";
import { TurnManagerContext } from "../../context/TurnManagerProvider.js";
import { Height } from "@mui/icons-material";

const ServicesModal = ({ isOpen, onClose }) => {
    const { addServicesModalOpen, openAddServicesModal, closeAddServicesModal, newServiceFormData, changes } = useAddServicesModal();

    const { services, refreshService } = useFetchService();
    const { currentBusiness } = useContext(BusinessesContext);
    const { currentTurn, currentTechnician } = useContext(TurnManagerContext);

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

    const deleteService = async (service) => {
        try {
            const response = await fetch(`/api/service?business_id=${currentBusiness._id}&service_id=${service._id}`, {
                method: "DELETE"
            })

            if (response.ok) {
                refreshService();
            }

        } catch (error) {
            console.error("Error:", error);
        }
    }

    const skipTurn = async () => {
        try {
            const response = await fetch('/api/service_record/skip', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    turn: currentTurn,
                    technician: currentTechnician
                })
            })

            const responseData = await response.json();

            if (response.ok) {
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addTurn = async (service) => {
        try {
            const response = await fetch((currentTurn._id ? '/api/service_record/edit' : '/api/service_record'), {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    turn: currentTurn,
                    technician: currentTechnician,
                    service: service
                })
            })

            const responseData = await response.json();

            if (response.ok) {
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteTurn = async () => {
        if (currentTurn._id) {
            try {
                const response = await fetch(`/api/service_record/delete?business_id=${currentBusiness._id}&turn_id=${currentTurn._id}`, {
                    method: "DELETE"
                })

                if (response.ok) {
                    onClose();
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const clickService = async (service) => {
        if (isSelectingEdit) {
            setIsSelectingEdit(false);
            openAddServicesModal(service);
        } else if (isSelectingDelete) {
            setIsSelectingDelete(false);
            const confirm = window.confirm(`WARNING: Do you want to delete ${service.name}?`)

            if (confirm) {
                deleteService(service);
            }
        } else if (currentTechnician?._id) {
            addTurn(service);
        }
    }

    const addService = async (event) => {
        try {
            const response = await fetch(`/api/service?business_id=${currentBusiness._id}`, {
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
                title={`Set Turn ${service.name}`}
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
                        {
                            currentTurn._id
                            &&
                            <button
                                className={`modal-card delete`}
                                onClick={deleteTurn}
                                style={{ backgroundColor: "red" }}
                                title="Delete Turn"
                            >
                                <CloseIcon style={{ height: "100%", width: "100%" }} />
                            </button>
                        }
                        {
                            currentTechnician._id
                            &&
                            <button
                                className={`modal-card skip`}
                                onClick={skipTurn}
                                style={{ backgroundColor: "white" }}
                                title="Skip Turn"
                            >
                                {"SKIP"}
                            </button>
                        }
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