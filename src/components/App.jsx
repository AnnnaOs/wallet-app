import { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import CurrentUser from './CurrentUser/CurrentUser.jsx';
import { refreshThunk } from '../redux/auth/operations';
import { selectIsRefreshing } from '../redux/auth/selectors';
import Loader from './Loader/Loader';

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthHeader(token);
      dispatch(refreshThunk());
    }
  }, [dispatch]);

  return isRefreshing ? <Loader /> : (
    <Suspense fallback={null}>
      <Routes>
        <Route path="user" element={<CurrentUser />} />
        {/* другие маршруты */}
      </Routes>
    </Suspense>
  );
};

export default App;
