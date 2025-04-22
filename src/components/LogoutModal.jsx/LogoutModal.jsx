import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutThunk } from 'redux/auth/operations';
import './LogoutModal.css';

const LogoutModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await dispatch(logOutThunk()).unwrap();
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      alert('Logout failed: ' + error);
    }
  };

  return (
    <>
      {/* Тимчасова кнопка — видалити, коли буде готовий хедер */}
      <button className="logout-trigger-button" onClick={handleOpen}>
        Exit
      </button>

      {isOpen && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h2 className="logout-title">Exit</h2>
            <p className="logout-text">Are you sure you want to log out?</p>
            <div className="logout-buttons">
              <button
                className="logout-btn logout-btn--confirm"
                onClick={handleLogout}
              >
                Log out
              </button>
              <button
                className="logout-btn logout-btn--cancel"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutModal;
