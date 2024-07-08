import { useState, useEffect, useContext } from 'react';


const useFetchUser = () => {

    const [user, setUser] = useState([]);
    const refreshUser = async () => {
        try {
            const response = await fetch(`/api/user`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            setUser(responseData.userList);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return { user, refreshUser };
};

export default useFetchUser;