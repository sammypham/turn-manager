import { useState, useEffect, useContext } from 'react';
import { BusinessesContext } from '../context/BusinessesProvider';
import { useParams } from 'react-router-dom';

const useFetchTech = () => {
    const { business_id } = useParams();

    const [technicians, setTechnicians] = useState([]);

    const refreshTechnician = async () => {
        try {
            const response = await fetch(`/api/tech?business_id=${business_id}`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            setTechnicians(responseData.techList);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        refreshTechnician();
    }, [business_id]);

    return { technicians, refreshTechnician };
};

export default useFetchTech;