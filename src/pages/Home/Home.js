import { useState } from "react";
import Header from "../../components/Header/Header";
import "./Home.css"

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

const Home = () => {
    const [signInModalOpen, setSignInModalOpen] = useState(false);
    const [serviceMenuModalOpen, setServiceMenuModalOpen] = useState(false);

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
        return (
            <button className="modal-card" key={index}>
                {service ? service.name : "Service Name"}
            </button>
        )
    }

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
                    <div className="modal-container services-modal-container">
                        <div className="modal-header">
                            Services
                        </div>
                        <button onClick={closeServiceMenuModal} className="close-button">
                            <CloseIcon />
                        </button>
                        <div className="modal-content-wrapper">
                            <div className="modal-content">
                                {createServiceCard()}
                                {createServiceCard()}
                                {createServiceCard()}
                                {createServiceCard()}
                                {createServiceCard()}
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