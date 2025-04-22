import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute.jsx';
import RestrictedRoute from '../routes/RestrictedRoute.jsx';
import { useIsMobile } from '../redux/hooks/useIsMobile.js';
import DashboardPage from '../pages/DashboardPage.jsx';
import StatisticsTab from '../pages/StatisticsTab.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import HomeTab from '../pages/HomeTab.jsx';
import CurrencyTab from '../pages/CurrencyTab.jsx';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';

import BalanceTab from './BalanceTab.jsx';

const App = () => {
  const isMobile = useIsMobile();
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        >
          <Route
            path="index"
            element={
              isMobile ? (
                <>
                  <BalanceTab />
                  <HomeTab />
                </>
              ) : (
                <HomeTab />
              )
            }
          />
          <Route path="statistics" element={<StatisticsTab />} />
          <Route
            path="currency"
            element={isMobile ? <CurrencyTab /> : <Navigate to="/" />}
          />
        </Route>
        <Route
          path="login"
          element={
            <RestrictedRoute>
              <LoginPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="register"
          element={
            <RestrictedRoute>
              <RegistrationPage />
            </RestrictedRoute>
          }
        />
      </Routes>
      ;
    </div>
  );
};
