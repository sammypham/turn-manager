import { useState, useEffect, useContext } from 'react';
import { BusinessesContext } from '../context/BusinessesProvider';

const useFetchTech = () => {
    const { currentBusiness } = useContext(BusinessesContext);

    const [technicians, setTechnicians] = useState([]);

    const fetchData = async () => {
        const [technicians, setTechnicians] = useState([]); // Initialize data as an empty array
        const refreshTechnician = async () => {
            try {
                const response = await fetch(`/api/tech?business_id=${currentBusiness._id}`, {
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
        }, []);

        return { technicians, refreshTechnician };
    };
    export default useFetchTech;