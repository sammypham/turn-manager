import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useFetchBusinesses = () => {
    const [businesses, setBusinesses] = useState([]);
    const [currentBusiness, setCurrentBusiness] = useState(null);

    const useFetchBusinessById = async (business_id) => {
        try {
            const response = await fetch(`/api/business/single/${business_id}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            console.log(responseData.business);

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

    return { businesses, currentBusiness, setBusinesses, setCurrentBusiness, refreshBusinesses, useFetchBusinessById };
};

export default useFetchBusinesses;