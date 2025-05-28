import { useState, useRef, useEffect } from 'react';

import style from './EditTransactionForm.module.css';

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = option => {
    setSelectedValue(option);
    onChange(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.customSelect} ref={dropdownRef}>
      <div
        className={`${style.selectHeader} ${
          isOpen ? style.selectHeaderActive : ''
        }`}
        onClick={toggleDropdown}
      >
        {selectedValue || placeholder || 'Select a category'}
        <span
          className={`${style.arrow} ${isOpen ? style.arrowUp : ''}`}
        ></span>
      </div>

      {isOpen && (
        <div className={style.optionsList}>
          {options.map((option, index) => (
            <div
              key={index}
              className={`${style.option} ${
                selectedValue === option ? style.selected : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      <div className={style.selectUnderline}></div>
    </div>
  );
};

export default CustomSelect;
