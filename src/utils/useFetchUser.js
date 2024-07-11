import { useState, useEffect } from 'react';

const useFetchUser = () => {
    const [user, setUser] = useState(localStorage.getItem('user_id'));
    const [userLoading, setUserLoading] = useState(false);

    const refreshUser = async () => {
        try {
            setUserLoading(true);

            const response = await fetch(`/api/user`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            const userId = responseData.user_id;
            setUser(userId);
            localStorage.setItem('user_id', userId); // Store user_id in local storage
            setUserLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setUserLoading(false);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return { user, refreshUser, userLoading, setUser };
};

export default useFetchUser;