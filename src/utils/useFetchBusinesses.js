import { useState, useEffect } from 'react';

const useFetchBusinesses = () => {
    const [businesses, setBusinesses] = useState([]);

    const refreshBusinesses = async () => {
        try {
            const response = await fetch("/api/business", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            setBusinesses(responseData.businesses);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        refreshBusinesses();
    }, []);

    return { businesses, setBusinesses, refreshBusinesses };
};

export default useFetchBusinesses;