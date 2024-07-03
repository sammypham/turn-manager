    import { useState } from "react";
    import Header from "../../components/Header/Header";
    import "./Home.css"

    import useFetchTech from "../../utils/useFetchTech.js"
    import useFetchService from "../../utils/useFetchService.js"
    import AddIcon from '@mui/icons-material/Add';
    import CloseIcon from '@mui/icons-material/Close';

    /*
    const services = [
        { name: "Manicure", abbreviation: "M", isHalfTurn: false, color: "#FF5733" },        // Red-orange
        { name: "Pedicure", abbreviation: "P", isHalfTurn: false, color: "#33FF57" },        // Green
        { name: "Acrylic Nails", abbreviation: "AN", isHalfTurn: true, color: "#3357FF" },  // Blue
        { name: "Gel Nails", abbreviation: "GN", isHalfTurn: false, color: "#FF33A1" },      // Pink
        { name: "Nail Art", abbreviation: "NA", isHalfTurn: false, color: "#A133FF" },   
    ];


    const technicians = [
        {
            name: "Bob",
            turns: ["Manicure"]
        },
        {
            name: "Diana",
            turns: ["Nail Art", "Gel Nails"] 
        },
        {
            name: "Alice",
            turns: ["Manicure", "Acrylic Nails"]
        },
        {
            name: "Charlie",
            turns: ["Pedicure", "Nail Art", "Nail Art"]
        }

    ]
    technicians.sort(function(a,b) { 
    var firstElementLength = 0;
    var secondElementLength = 0;
    a.turns.forEach(function(currentService) {
        // Action to perform on each element
        const firstElement = services.find(service => service.name === currentService)
        firstElementLength = firstElement.isHalfTurn ? firstElementLength += 0.5 : firstElementLength += 1

    });
    b.turns.forEach(function(currentService) {
        // Action to perform on each element
        const secondElement = services.find(service => service.name === currentService)
        secondElementLength = secondElement.isHalfTurn ? secondElementLength += 0.5 : secondElementLength += 1
        

    }); 
    return firstElementLength - secondElementLength
    });
    console.log(technicians)
*/
    const Home = () => {
        const [signInModalOpen, setSignInModalOpen] = useState(false);
        const [serviceMenuModalOpen, setServiceMenuModalOpen] = useState(false);
        const [newService, setNewService] = useState({name : '', isHalfTurn: false});
        const [nextTechnician, setNextTechnician] = useState(null);

        const { technicians, fetchData } = useFetchTech();

        const { services, refreshService } = useFetchService();

        const openSignInModal = () => {
            setSignInModalOpen(true);
        }

        const closeSignInModal = () => {
            setSignInModalOpen(false);
        }

        const openServiceMenuModal = async () => {
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
                <button
                    className={`modal-card ${service.isHalfTurn ? "slashed" : ""}`}
                    key={index}
                    style={{ '--service-color': `${service.color}` }}
                >
                    {service ? service.name : "Service Name"}
                </button>
            );
        };


        const changeService = (event) => {
            setNewService(
                {
                ...newService,
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
                            <form onSubmit={addService}>
                                <input name="service" placeholder="service" value={newService.name} onChange={changeService}/>
                                <input type="checkbox"  name="isHalf" value={newService.isHalfTurn} onChange={changeHalf}/>
                                <button type="submit" className="modal-button add-service-button">
                                    Add Service
                                </button>
                            </form>
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