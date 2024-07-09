import { useState, useEffect } from 'react';

const useFetchBusinesses = () => {
    const [businesses, setBusinesses] = useState([]);
    const [currentBusiness, setCurrentBusiness] = useState(undefined);

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
    const refreshCurrentBusinesses = async () => {
    
        try {
            const response = await fetch("/api/business/currentBusiness", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            setCurrentBusiness(responseData.currentBusiness);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        refreshBusinesses();
        refreshCurrentBusinesses()
    }, []);

    return { businesses, currentBusiness, setBusinesses, setCurrentBusiness, refreshBusinesses, refreshCurrentBusinesses };
};

export default useFetchBusinesses;