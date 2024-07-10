import { useContext, useState } from "react";
import "./Businesses.css"

import AddIcon from '@mui/icons-material/Add';
import AddBusinessModal from "../../components/Modals/AddBusinessModal";
import { useNavigate } from "react-router-dom";
import useFetchBusinesses from "../../utils/useFetchBusinesses";
import { BusinessesContext } from "../../context/BusinessesProvider";

const Businesses = () => {
    const navigate = useNavigate();
    const { businesses, refreshBusinesses, setCurrentBusiness } = useContext(BusinessesContext);

    const [addBusinessModalOpen, setAddBusinessModalOpen] = useState(false);

    const clickBusiness = async (business) => {
        try {
            const response = await fetch(`/api/business/currentBusiness`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    business
                })
            })

            const responseData = await response.json();

            if (response.ok) {
                navigate(`/home/${business._id}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const clickAddBusiness = () => {
        setAddBusinessModalOpen(true);
    }

    const closeAddBusinessModal = () => {
        setAddBusinessModalOpen(false);
    }

    const createBusinessCard = (business, index) => {
        return (
            <button onClick={() => clickBusiness(business)} className="business-card" key={index}>
                <div className="business-name">
                    {business.name}
                </div>
            </button>
        )
    }

    return (
        <>
            <AddBusinessModal isOpen={addBusinessModalOpen} onClose={closeAddBusinessModal} />
            <div className="businesses-page-container">
                <h1>
                    My Businesses
                </h1>
                <div className="content-container">
                    {
                        businesses.map((business, index) =>
                            createBusinessCard(business, index)
                        )
                    }
                    <button onClick={clickAddBusiness} className="business-card add">
                        <div>
                            <AddIcon />
                            <div>
                                Add New Business
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Businesses;