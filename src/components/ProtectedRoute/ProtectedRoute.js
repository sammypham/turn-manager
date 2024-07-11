import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../../context/UserProvider';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { user } = useContext(UserContext);

    return user ? <Component {...rest} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;