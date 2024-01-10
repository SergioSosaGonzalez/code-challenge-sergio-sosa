import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from './contexts/GlobalContext';

const ProtectedRoute = ({
  children,
  isPublic = false,
}: {
  children: React.ReactNode;
  isPublic?: boolean;
}) => {
  const globalContext = useContext(GlobalContext);
  if (!isPublic && !globalContext?.appState.logged) {
    return <Navigate to='/login' replace />;
  }
  if (isPublic && globalContext?.appState.logged) {
    return <Navigate to='/users' replace />;
  }

  return children;
};

export default ProtectedRoute;
