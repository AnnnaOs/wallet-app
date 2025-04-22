import { Routes, Route } from 'react-router-dom';
import RegistrationPage from '../pages/RegistrationPage';

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
};

export default App;