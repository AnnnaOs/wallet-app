import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { selectIsRefreshing } from '../redux/auth/selectors';
import { refreshThunk } from '../redux/auth/operations';
import { initializeToken, setToken } from '../configAPI/api.js';
import useResponsive from '../hooks/useResponsive.js';
import PrivateRoute from '../routes/PrivateRoute.jsx';
import RestrictedRoute from '../routes/RestrictedRoute.jsx';
import Loader from './Loader/Loader';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';
import { setTokenFromStorage } from '../redux/auth/slice.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardPage = lazy(() =>
  import('../pages/DashboardPage/DashboardPage')
);
const StatisticsTab = lazy(() =>
  import('../pages/StatisticsTab/StatisticsTab')
);
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const HomeTab = lazy(() => import('../pages/HomeTab/HomeTab'));
const CurrencyTab = lazy(() => import('../pages/CurrencyTab/CurrencyTab'));
const RegistrationPage = lazy(() =>
  import('../pages/RegistrationPage/RegistrationPage')
);

const App = () => {
  const dispatch = useDispatch();
  const { isMobile } = useResponsive();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    initializeToken();
    const token = localStorage.getItem('authToken');
    if (token) {
      // setToken(token);
      dispatch(setTokenFromStorage(token));
      dispatch(refreshThunk());
    }
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
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
            <Route index element={<HomeTab />} />
            <Route path="statistics" element={<StatisticsTab />} />
            <Route
              path="currency"
              element={isMobile ? <CurrencyTab /> : <Navigate to="/" />}
            />
          </Route>

          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <RegistrationPage />
              </RestrictedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
