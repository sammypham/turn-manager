import { useState } from "react";
import Header from "../../components/Header/Header";
import "./Home.css"

    import useFetchTech from "../../utils/useFetchTech.js"
    import useFetchService from "../../utils/useFetchService.js"
    import AddIcon from '@mui/icons-material/Add';
    import CloseIcon from '@mui/icons-material/Close';

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

    /*
    const services = [
        { name: "Manicure", abbreviation: "M", isHalfTurn: false, color: "#FF5733" },        // Red-orange
        { name: "Pedicure", abbreviation: "P", isHalfTurn: false, color: "#33FF57" },        // Green
        { name: "Acrylic Nails", abbreviation: "AN", isHalfTurn: false, color: "#3357FF" },  // Blue
        { name: "Gel Nails", abbreviation: "GN", isHalfTurn: false, color: "#FF33A1" },      // Pink
        { name: "Nail Art", abbreviation: "NA", isHalfTurn: false, color: "#A133FF" },       // Purple
        { name: "Polish Change", abbreviation: "PC", isHalfTurn: true, color: "#FF5733" },   // Red-orange
        { name: "Toe-Nails Cut", abbreviation: "TNC", isHalfTurn: true, color: "#33FFA1" },  // Light green
        { name: "French Manicure", abbreviation: "FM", isHalfTurn: false, color: "#FFA133" },// Orange
        { name: "Shellac Manicure", abbreviation: "SM", isHalfTurn: false, color: "#33A1FF" },// Light blue
        { name: "Paraffin Wax Treatment", abbreviation: "PWT", isHalfTurn: true, color: "#FF5733" }, // Red-orange
        { name: "Hand Massage", abbreviation: "HM", isHalfTurn: true, color: "#FF33FF" },    // Magenta
        { name: "Foot Massage", abbreviation: "FM", isHalfTurn: true, color: "#FF33D4" },    // Deep pink
        { name: "Nail Repair", abbreviation: "NR", isHalfTurn: true, color: "#33FFF4" },     // Aqua
        { name: "Cuticle Care", abbreviation: "CC", isHalfTurn: true, color: "#FF33F4" },    // Pink
        { name: "Callus Removal", abbreviation: "CR", isHalfTurn: false, color: "#A1FF33" }, // Lime green
        { name: "Nail Extensions", abbreviation: "NE", isHalfTurn: false, color: "#FF5733" },// Red-orange
        { name: "Dip Powder Nails", abbreviation: "DPN", isHalfTurn: false, color: "#5733FF" },// Indigo
        { name: "Ombre Nails", abbreviation: "ON", isHalfTurn: false, color: "#33A1FF" },    // Light blue
        { name: "Nail Shaping", abbreviation: "NS", isHalfTurn: true, color: "#FF33A1" }     // Pink
    ];
    */

    const Home = () => {
        const [signInModalOpen, setSignInModalOpen] = useState(false);
        const [serviceMenuModalOpen, setServiceMenuModalOpen] = useState(false);
        const [newService, setNewService] = useState({name : '', isHalfTurn: false});
        const [nextTechnician, setNextTechnician] = useState(null);

    const openSignInModal = () => {
        setSignInModalOpen(true);
    }

    const closeSignInModal = () => {
        setSignInModalOpen(false);
    }

    const openServiceMenuModal = () => {
        setServiceMenuModalOpen(true);
    }

    const closeServiceMenuModal = () => {
        setServiceMenuModalOpen(false);
    }

    const openAddServiceModal = () => {
        setAddServiceModalOpen(true);
    }

    const closeAddServiceModal = () => {
        setAddServiceModalOpen(false);
        setNewServiceFormData(newServiceFormEmpty);
    }

    const clickClearTracker = () => {
        const confirm = window.confirm("Are you sure you want to clear the turn tracker?");
        if (confirm) {

        }
    }

    const createTechnicianCard = (technician, index) => {
        return (
            <button className="modal-card" key={index}>
                {technician ? technician.name : "Technician Name"}
            </button>
        )
    }

    const createServiceCard = (service, index) => {
        console.log(service.color);
        return (
            <button
                className={`modal-card ${service.isHalfTurn ? "slashed" : ""}`}
                key={index}
                style={{ '--service-color': `${service.color}` }}
            >
                {service ? service.name : "Service Name"}
            </button>
        );
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
            setNewService(
                {
                ...newService,
                isHalfTurn: event.target.value
                }
            )
        }

        const addService = async(event) => {
            console.log("here")
            try {
                const response = await fetch('/api/service', {
                    method: "POST",
                    headers: { 
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(newService)
                })
                const responseData = await response.json();
                refreshService();
            } catch (error) {
                console.error("Error:", error);
                return [];
            }
        }

        const { data } = useFetchTech();
        const { services, refreshService } = useFetchService();

    return (
        <>
            <Header />
            {
                signInModalOpen
                &&
                <div
                    className="modal-background"
                    onClick={(e) => { if (e.currentTarget === e.target) { closeSignInModal() } }}
                >
                    <div className="modal-container technicians-modal-container">
                        <div className="modal-header">
                            Technicians
                        </div>
                        <button onClick={closeSignInModal} className="close-button">
                            <CloseIcon />
                        </button>
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
            }
            {
                serviceMenuModalOpen
                &&
                <div
                    className="modal-background"
                    onClick={(e) => { if (e.currentTarget === e.target) { closeServiceMenuModal() } }}
                >
                    {
                        addServiceModalOpen
                        &&
                        <div
                            className="modal-background"
                            onClick={(e) => { if (e.currentTarget === e.target) { closeAddServiceModal() } }}
                        >
                            <div className="modal-container add-service-modal-container">
                                <div className="modal-header">
                                    Add New Service
                                </div>
                                <button onClick={closeAddServiceModal} className="close-button">
                                    <CloseIcon />
                                </button>
                                <div className="modal-form-wrapper">
                                    Service Name:
                                    <input
                                        className="modal-form-input"
                                        placeholder="New Service Name (required)"
                                        value={newServiceFormData.name}
                                        onChange={changeServiceName}
                                    />
                                    <div style={{ margin: "0px 0px" }}>
                                        Half Turn:
                                        <Checkbox
                                            checked={newServiceFormData.isHalfTurn}
                                            onChange={changeHalf}
                                        />
                                    </div>
                                    <div style={{ display: "flex", margin: "20px", justifyContent: "center" }}>
                                        <CirclePicker
                                            color={newServiceFormData.color}
                                            onChange={changeColor}
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
                    }
                    <div className="modal-container services-modal-container">
                        <div className="modal-header">
                            Services
                        </div>
                        <button onClick={closeServiceMenuModal} className="close-button">
                            <CloseIcon />
                        </button>
                        <div className="modal-button-header">
                            <button onClick={openAddServiceModal} className="modal-button add-service-button">
                                Add Service
                            </button>
                            <button className="modal-button edit-service-button">
                                Edit Service
                            </button>
                            <button className="modal-button delete-service-button">
                                Delete Service
                            </button>
                        </div>
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
            }
            <div className="home__turn-tracker-container">
                <div className="home__turn-tracker-header">
                    <button onClick={openSignInModal} className="header-button sign-in">
                        Sign In
                    </button>
                    <div style={{ height: "100%", alignContent: "center" }}>
                        Next Technician: <b>{nextTechnician ? nextTechnician.name : "none"}</b>
                    </div>
                    <button onClick={clickClearTracker} className="header-button clear">
                        Clear
                    </button>
                </div>
                <div className="home__turn-tracker-wrapper">
                    {technicians.map((technician, techIndex) =>
                        <div key={techIndex} className="home__turn-tracker-row">
                            <div className="technician_name">
                                {technician.name} ({technician.turns.length})
                            </div>
                            {technician.turns.map((turn, turnIndex) =>
                                <button onClick={openServiceMenuModal} key={`${techIndex} ${turnIndex}`} className="turn-box">
                                    {turn.substring(0, 4)}
                                </button>
                            )}
                            <button onClick={openServiceMenuModal} className="turn-box add-turn">
                                <AddIcon />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;