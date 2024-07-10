import { useState, useContext } from 'react';

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BusinessesContext } from "../../context/BusinessesProvider";
import "./Settings.css"

import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Setting = () => {
    const { business_id } = useParams();

    const { currentBusiness, refreshBusinesses, getBusinessById } = useContext(BusinessesContext);
    const navigate = useNavigate();

    const [businessName, setBusinessName] = useState("");

    const onNameChange = (event) => {
        setBusinessName(event.target.value)
    }

    const editBusiness = async (event) => {
        try {
            const response = await fetch(`/api/edit`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: businessName
                })
            })

            const responseData = await response.json();

            if (response.ok) {
                refreshBusinesses();
                getBusinessById(business_id);
                setBusinessName("");
            }
        } catch (error) {
            console.error("Error:", error);
            return [];
        }
    }

    const deleteBusiness = async (event) => {
        const confirm = window.confirm(`Are you sure you want to delete this business? (${currentBusiness.name})`)

        if (confirm) {
            try {
                const response = await fetch(`/api/edit`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                const responseData = await response.json();

                if (response.ok) {
                    refreshBusinesses();
                    navigate(`/businesses`);
                }
            } catch (error) {
                console.error("Error:", error);
                return [];
            }
        }

    }

    return (
        <div style={{
            padding: "20px",
            minHeight: "calc(100vh - 50px)"
        }}>
            <div className="business-settings__container">
                <div>
                    <NavLink
                        to={`/home/${business_id}`}
                        className='back-button'
                    >
                        <ArrowBackIcon />
                    </NavLink>
                </div>
                <div className="business-settings__business-name">
                    {currentBusiness.name}
                    <button
                        className="delete-button" onClick={deleteBusiness}
                    >
                        <DeleteIcon />
                    </button>
                </div>
                <div className="settings-inner-container">
                    <div className="business-settings__header">
                        General Settings
                    </div>
                    <div className='business-settings__basic-input-container'>
                        <div className='settings-name'>
                            Change Business Name:
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <input
                                className='input-box'
                                type="text"
                                name=""
                                value={businessName}
                                onChange={onNameChange}
                                placeholder="Change Business Name"
                            />
                            <button
                                onClick={editBusiness}>
                                Apply
                            </button>
                        </div>

                    </div>
                </div>
            </div >
        </div>
    );
};

export default Setting;