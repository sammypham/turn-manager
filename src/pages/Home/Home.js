import { useContext, useEffect, useState } from "react";
import "./Home.css"

import AddIcon from '@mui/icons-material/Add';

import SignInModal from "../../components/Modals/SignInModal.js";
import ServicesModal from "../../components/Modals/ServicesModal.js";
import { useServicesModal } from "../../context/ServicesModalProvider.js";
import { useSignInModal } from "../../context/SignInModalProvider.js";
import dayjs from "dayjs";
import { BusinessesContext } from "../../context/BusinessesProvider.js";
import { TurnManagerContext } from "../../context/TurnManagerProvider.js";

const Home = () => {
    const [nextTechnician, setNextTechnician] = useState(null);
    const { signInModalOpen, openSignInModal, closeSignInModal } = useSignInModal();
    const { servicesModalOpen, openServicesModal, closeServicesModal } = useServicesModal();
    const { currentBusiness } = useContext(BusinessesContext);
    const { currentTechnician, setCurrentTechnician, setCurrentTurn } = useContext(TurnManagerContext);
    const [sortedTechnicians, setSortedTechnicians] = useState([]);

    const [signIns, setSignIns] = useState([]);

    const getSignIns = async () => {
        try {
            const response = await fetch(`/api/sign_in?business_id=${currentBusiness._id}`, {
                method: "GET"
            })

            const responseData = await response.json();

            setSignIns(responseData.signIns);
        } catch (error) {
            console.error(error);
        }
    }

    const findNextTechnician = () => {
        const techniciansWithTurnSum = signIns.map(signIn => {
            const turnSum = signIn.services.reduce((turnSum, turn) => {
                return turnSum + (turn.service.isHalfTurn ? 0.5 : 1);
            }, 0);
            return { technician: signIn.technician, services: signIn.services, turnSum, time: signIn.time };
        });

        const newSortedTechnicians = techniciansWithTurnSum.sort((a, b) => {
            if (a.turnSum === b.turnSum) {
                return new Date(a.time) - new Date(b.time); // Sort by time if turnSum is equal
            }
            return Math.floor
                (a.turnSum) - Math.floor(b.turnSum); // Sort by turnSum
        });

        setSortedTechnicians(newSortedTechnicians);
        setNextTechnician(newSortedTechnicians.length > 0 ? newSortedTechnicians[0].technician : null);
    }

    useEffect(() => {
        if (!signInModalOpen && !servicesModalOpen) {
            setCurrentTechnician({});
            setCurrentTurn({});
            getSignIns();
        }

    }, [signInModalOpen, servicesModalOpen]);

    useEffect(() => {
        getSignIns();
    }, []);

    useEffect(() => {
        findNextTechnician();
    }, [signIns]);

    const clickClearTracker = () => {
        const confirm = window.confirm("Are you sure you want to clear the turn tracker?");
        if (confirm) {

        }
    }

    const clickOpenTurn = (turn) => {
        setCurrentTechnician(turn.technician);
        setCurrentTurn(turn);

        openServicesModal();
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
                        {sortedTechnicians
                            .sort((a, b) => { return new Date(a.time) - new Date(b.time) })
                            .map((signIn, signInIndex) =>
                                <div key={signInIndex} className="home__turn-tracker-row">
                                    <div className={`technician_name ${nextTechnician === signIn.technician ? " next-turn" : "add-turn"}`}>
                                        <div className="turn-order">
                                            {signInIndex + 1}
                                        </div>
                                        <div className="turn-time">
                                            {dayjs(signIn.time).format("hh:mm A")}
                                        </div>
                                        {signIn.technician.name} ({signIn.turnSum})
                                    </div>
                                    {signIn.services.map((turn, turnIndex) =>
                                        <button onClick={() => clickOpenTurn(turn)}
                                            key={`${signInIndex} ${turnIndex}`}
                                            className={`turn-box ${turn.service.isHalfTurn ? " slashed" : ""}`}
                                            style={{ '--service-color': `${turn.service.color}` }}
                                        >
                                            {turn.service.name}
                                            <div className="turn-counter">
                                                {turnIndex + 1}
                                            </div>
                                            <div className="turn-time">
                                                {dayjs(turn.time).format("hh:mm A")}
                                            </div>
                                        </button>
                                    )}
                                    <button onClick={() => clickAddTurn(signIn.technician)} className={`turn-box ${nextTechnician === signIn.technician ? "next-turn" : "add-turn"}`}>
                                        {nextTechnician === signIn.technician ? "NEXT" : <AddIcon />}
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