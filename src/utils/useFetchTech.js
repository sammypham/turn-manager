import { useState, useEffect } from 'react';

const useFetchTech = () => {
    const [technicians, setTechnicians] = useState([]); // Initialize data as an empty array
    const fetchData = async () => {
        try {
            const response = await fetch("/api/tech", {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }         
            const responseData = await response.json();
            console.log("test")
            setTechnicians(responseData.techList);   
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        fetchData(); // Call fetchData inside useEffect
    }, []); // Empty dependency array to run effect only once on mount
    return {technicians, fetchData};
};
export default useFetchTech;