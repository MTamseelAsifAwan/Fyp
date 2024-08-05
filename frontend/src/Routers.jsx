import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Home from './Home.jsx';
import SignupForm from './Components/Signupform.jsx';
import LoginForm from './Components/Loginform.jsx';
import SkeletonLoader from './Components/Loader/DashboardSkeleton.jsx';
// Lazy loading Dashboard component
const Dashboard = lazy(() => import('./Components/DashboardComponents/Dashboard.jsx'));

const Routers = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set authentication state based on the user object
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Suspense fallback={<div><SkeletonLoader/></div>}>
                <Dashboard />
              </Suspense>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Add your other routes here */}
      </Routes>
    </Router>
  );
};

export default Routers;
