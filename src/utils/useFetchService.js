import { useState, useEffect } from 'react';

const useFetchService = () => {
    const [services, setServices] = useState([]); // Initialize data as an empty array
    const refreshService = async () => {
        try {
            const response = await fetch("/api/service", {
                method: "GET",
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
        refreshService(); // Call fetchData inside useEffect
    }, []); // Empty dependency array to run effect only once on mount
    return {services, refreshService};
};
export default useFetchService;