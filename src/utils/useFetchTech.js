import { useState, useEffect } from 'react';

const useFetchTech = () => {
    const [data, setData] = useState([]); // Initialize data as an empty array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/tech", {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const responseData = await response.json();
                console.log(responseData)
                setData(responseData);
        
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData(); // Call fetchData inside useEffect

    }, []); // Empty dependency array to run effect only once on mount

    return { data };
};

export default useFetchTech;