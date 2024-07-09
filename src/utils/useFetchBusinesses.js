import { useState, useEffect } from 'react';

const useFetchBusinesses = () => {
    const [businesses, setBusinesses] = useState([]);
    const [currentBusiness, setCurrentBusiness] = useState(null);

    const getBusinessById = async (business_id) => {
        try {
            const response = await fetch(`/api/business/single/${business_id}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            setCurrentBusiness(responseData.business);
        } catch (error) {
            console.error("Error:", error);
        }
    }

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

    return { businesses, currentBusiness, setBusinesses, setCurrentBusiness, refreshBusinesses, getBusinessById };
};

export default useFetchBusinesses;