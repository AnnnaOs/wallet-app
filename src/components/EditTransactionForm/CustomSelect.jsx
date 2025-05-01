import { useState, useRef, useEffect } from 'react';
import style from './EditTransactionForm.module.css';

const CustomSelect = ({ options, value, onChange, placeholder, name }) => {
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
    onChange(option); // Вызываем onChange, чтобы передать значение в Formik
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.customSelect} ref={dropdownRef}>
      {/* Скрытое поле для Formik */}
      <input
        type="hidden"
        name={name} // Пропс name для передачи в форму
        value={selectedValue}
      />
      
      <div
        className={`${style.selectHeader} ${isOpen ? style.selectHeaderActive : ''}`}
        onClick={toggleDropdown}
      >
        {selectedValue || placeholder || 'Select a category'}
        <span className={`${style.arrow} ${isOpen ? style.arrowUp : ''}`}></span>
      </div>

      {isOpen && (
        <div className={style.optionsList}>
          {options.map((option, index) => (
            <div
              key={index}
              className={`${style.option} ${selectedValue === option ? style.selected : ''}`}
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
