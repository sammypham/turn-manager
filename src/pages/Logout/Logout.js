import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const [empty, setEmpty] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
          try {
            const response = await fetch(`/auth/google/logoutCallback`, {
              method: "GET",
              credentials: "same-origin", // Ensure cookies (session) are sent with the request
            });
    
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
    
            // Redirect to the homepage after successful logout
            navigate("/login"); 
          } catch (error) {
            console.error("Error:", error);
            // Handle error gracefully (e.g., show error message)
          }
        };
    
        logout(); // Call the logout function immediately
      }, [navigate]);
    return (
        <div>
            
        </div>
    );
};

export default Logout;