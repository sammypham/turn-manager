import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useFetchBusinesses = () => {
    const [businesses, setBusinesses] = useState([]);
    const [currentBusiness, setCurrentBusiness] = useState(null);

    const refreshCurrentBusiness = async () => {
        try {
            const response = await fetch("/api/business/currentBusiness", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            console.log(responseData.currentBusiness);

            setCurrentBusiness(responseData.currentBusiness);
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
            console.log(response.businesses)
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        refreshBusinesses();
        refreshCurrentBusiness();
    }, []);

    return { businesses, currentBusiness, setBusinesses, setCurrentBusiness, refreshBusinesses, refreshCurrentBusiness };
};

export default useFetchBusinesses;