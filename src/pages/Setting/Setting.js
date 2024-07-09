import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { BusinessesContext } from "../../context/BusinessesProvider";
import "./Setting.css"

const Setting = () => {
    const { businesses, refreshBusinesses, setCurrentBusiness } = useContext(BusinessesContext);
    const navigate = useNavigate();
    const [businessName, setBusinessName] = useState({
        name: "",
    });
    
    
    const onNameChange = (event) => {
        setBusinessName(
            {
                ...businessName,
                name: event.target.value
            }
        )
    }
    
    const editBusiness = async(event) => {
        try {
            const response = await fetch(`/api/edit`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(businessName)
            })

            const responseData = await response.json();
            if (response.ok) {
                refreshBusinesses();
                navigate(`/home/${responseData.businessId}`)
            }
        } catch (error) {
            console.error("Error:", error);
            return [];
        }
    }
    
    const deleteBusiness = async(event) => {
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
                navigate(`/businesses`)
            }
        } catch (error) {
            console.error("Error:", error);
            return [];
        }
    }
    return (
        <div className="setting-container">
        <div className="edit-container">
            <input
            type="text"
            name=""
            value={businessName.name}
            onChange={onNameChange}
            />
            
            <button className="edit-button setting-edit-button"onClick={editBusiness}>
                Edit
            </button>
        </div>
        <button className="edit-button setting-delete-button " onClick={deleteBusiness}> Delete</button>
        </div>
    );
};
/*
    const addService = async (event) => {
        try {
            const response = await fetch(`/api/service?business_id=${business_id}`, {
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
```
```
<button onClick={addService} className="modal-button add-service-button" style={{ margin: "20px 0px", marginLeft: "auto" }}>
{newServiceFormData.isEditing ? "Update Service" : "Add Service"}
</button>
```
*/
export default Setting;