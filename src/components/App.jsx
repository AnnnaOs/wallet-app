import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { refreshThunk } from '../redux/auth/operations';
import { useIsMobile } from '../hooks/useIsMobile.js';
import PrivateRoute from '../routes/PrivateRoute.jsx';
import RestrictedRoute from '../routes/RestrictedRoute.jsx';
import Balance from './Balance/Balance.jsx';
import Loader from './Loader/Loader';

const DashboardPage = lazy(() =>
  import('../pages/DashboardPage/DashboardPage.jsx')
);
const StatisticsTab = lazy(() =>
  import('../pages/StatisticsTab/StatisticsTab.jsx')
);
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage.jsx'));
const HomeTab = lazy(() => import('../pages/HomeTab/HomeTab.jsx'));
const CurrencyTab = lazy(() => import('../pages/CurrencyTab/CurrencyTab.jsx'));
const RegistrationPage = lazy(() =>
  import('../pages/RegistrationPage/RegistrationPage.jsx')
);

const App = () => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthHeader(token);
      dispatch(refreshThunk());
    }
  }, [dispatch]);

  return (
    <div>
      <Suspense fallback={<Loader />}>
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
                    <Balance />
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
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
