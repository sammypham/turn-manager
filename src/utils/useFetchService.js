import { useState, useEffect, useContext } from 'react';
import { BusinessesContext } from '../context/BusinessesProvider';
import { useParams } from 'react-router-dom';

const useFetchService = () => {
    const { business_id } = useParams();

    const [services, setServices] = useState([]); // Initialize data as an empty array

    const refreshService = async () => {
        try {
            const response = await fetch(`/api/service?business_id=${business_id}`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            setServices(responseData.serviceList);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        refreshService();
    }, [business_id]);

    return { services, refreshService };
};
export default useFetchService;