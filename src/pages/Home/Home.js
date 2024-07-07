import { useContext, useEffect, useState } from "react";
import "./Home.css"

import AddIcon from '@mui/icons-material/Add';

/*
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

import SignInModal from "../../components/Modals/SignInModal.js";
import ServicesModal from "../../components/Modals/ServicesModal.js";
import { useServicesModal } from "../../context/ServicesModalProvider.js";
import { useSignInModal } from "../../context/SignInModalProvider.js";
import dayjs from "dayjs";
import { BusinessesContext } from "../../context/BusinessesProvider.js";
import { TurnManagerContext } from "../../context/TurnManagerProvider.js";

// const technicians = [
//     {
//         name: "Bob",
//         turns: ["Manicure", "Pedicure"]
//     },
//     {
//         name: "Alice",
//         turns: ["Acrylic Nails", "Gel Nails"]
//     },
//     {
//         name: "Charlie",
//         turns: ["Pedicure", "Nail Art"]
//     },
//     {
//         name: "Diana",
//         turns: ["Manicure", "Acrylic Nails"]
//     },
//     {
//         name: "Eve",
//         turns: ["Gel Nails", "Nail Art"]
//     },
//     {
//         name: "Frank",
//         turns: ["Manicure", "Pedicure"]
//     },
//     {
//         name: "Grace",
//         turns: ["Acrylic Nails", "Gel Nails"]
//     },
//     {
//         name: "Hank",
//         turns: ["Pedicure", "Nail Art"]
//     },
//     {
//         name: "Ivy",
//         turns: ["Manicure", "Nail Art"]
//     },
//     {
//         name: "Jack",
//         turns: ["Gel Nails", "Manicure"]
//     },
//     {
//         name: "Karen",
//         turns: ["Acrylic Nails", "Pedicure"]
//     },
//     {
//         name: "Leo",
//         turns: ["Gel Nails", "Nail Art"]
//     },
// ];

const Home = () => {
    const [nextTechnician, setNextTechnician] = useState(null);
    const { signInModalOpen, openSignInModal, closeSignInModal } = useSignInModal();
    const { servicesModalOpen, openServicesModal, closeServicesModal } = useServicesModal();
    const { currentBusiness } = useContext(BusinessesContext);
    const { currentTechnician, setCurrentTechnician } = useContext(TurnManagerContext);

    const [signIns, setSignIns] = useState([]);

    const getSignIns = async () => {
        try {
            const response = await fetch(`/api/sign_in?business_id=${currentBusiness._id}`, {
                method: "GET"
            })

            const responseData = await response.json();

            console.log(responseData.signIns);

            setSignIns(responseData.signIns);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSignIns();
    }, [])

    const clickClearTracker = () => {
        const confirm = window.confirm("Are you sure you want to clear the turn tracker?");
        if (confirm) {

        }
    }

    const clickAddTurn = (technician) => {
        setCurrentTechnician(technician);

        openServicesModal();
    }

    return (
        <>
            <SignInModal isOpen={signInModalOpen} onClose={closeSignInModal} />
            <ServicesModal isOpen={servicesModalOpen} onClose={closeServicesModal} />
            <div className="home__turn-tracker-container">
                <div className="home__business-name">
                    {currentBusiness.name}
                </div>
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
                    <div className="home__turn-tracker-content-container">
                        {signIns.map((signIn, signInIndex) =>
                            <div key={signInIndex} className="home__turn-tracker-row">
                                <div className="technician_name">
                                    <div className="turn-order">
                                        {signInIndex + 1}
                                    </div>
                                    <div className="turn-time">
                                        {dayjs(signIn.time).format("hh:mm A")} {/*Checkin time*/}
                                    </div>
                                    {signIn.technician.name} ({signIn.services.length})
                                </div>
                                {signIn.services.map((turn, turnIndex) =>
                                    <button onClick={openServicesModal} key={`${signInIndex} ${turnIndex}`} className="turn-box">
                                        {turn.service.name}
                                        <div className="turn-counter">
                                            {turnIndex + 1}
                                        </div>
                                        <div className="turn-time">
                                            {dayjs(turn.time).format("hh:mm A")}
                                        </div>
                                    </button>
                                )}
                                <button onClick={() => clickAddTurn(signIn.technician)} className="turn-box add-turn">
                                    <AddIcon />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;