import { useDispatch } from 'react-redux';
import { addTransaction } from '../../redux/transactions/operations.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './AddTransactionForm.module.css';
import { api } from '../../configAPI/api.js';
import IconSvg from '../IconSvg/IconSvg.jsx';
import CustomSelect from '../EditTransactionForm/CustomSelect.jsx';

const FeedbackSchema = Yup.object().shape({
  transactionType: Yup.string().required('Виберіть тип транзакції'),
  category: Yup.string().when('transactionType', {
    is: 'expense',
    then: () => Yup.string().required('Виберіть категорію'),
    otherwise: () => Yup.string().notRequired(),
  }),
  sum: Yup.number()
    .typeError('Сумма має бути числом')
    .required('Це поле обов’язкове')
    .positive('Сума має бути позитивною')
    .max(1000000, 'Занадто велика сума!'),
  date: Yup.date().required('Виберіть дату'),
  comment: Yup.string()
    .min(3, 'Занадто коротко!')
    .max(20, 'Занадто довго!')
    .required('Обов’язкове поле')
    .trim('Не повинно бути пустим!'),
});

const AddTransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [activeType, setActiveType] = useState('expense');

  useEffect(() => {
    async function fetchCategories() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await api.get('/categories', {
          params: {
            type: activeType === 'income' ? 'Income' : 'Expense',
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const categoryList =
          activeType === 'income'
            ? response.data.income || []
            : response.data.expenses || [];

        setCategories(categoryList);
      } catch (error) {
        console.error('Не вдалося завантажити категорії:', error);
      }
    }

    fetchCategories();
  }, [activeType]);

  const initialValues = {
    transactionType: activeType,
    category: '',
    sum: '',
    date: new Date(),
    comment: '',
  };

  const handleSubmit = async (values, actions) => {
    const newTransaction = {
      type: values.transactionType === 'income' ? 'Income' : 'Expense',
      category:
        values.transactionType === 'income' ? 'Income' : values.category,
      sum: values.sum,
      date: values.date,
      comment: values.comment,
    };

    try {
      await dispatch(addTransaction(newTransaction));
      actions.resetForm();
      onClose();
    } catch (err) {
      console.error('Помилка при створенні транзакції:', err);
    }
  };

  return (
    <div className={style.formContainer}>
      <Formik
        validationSchema={FeedbackSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className={style.form}>
            <div className={style.typeSelector}>
              <span className={activeType === 'income' ? style.activeText : style.inactiveText}>Income</span>
              <label className={style.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={activeType === 'expense'}
                  onChange={() => {
                    const newType = activeType === 'expense' ? 'income' : 'expense';
                    setActiveType(newType);
                    setFieldValue('transactionType', newType);
                    setFieldValue('category', newType === 'income' ? 'Income' : '');
                  }}
                />
                <span className={style.slider}>
                  <span className={style.sliderButton}></span>
                </span>
              </label>
              <span className={activeType === 'expense' ? style.activeText : style.inactiveText}>Expense</span>
            </div>

            <div className={style.formFields}>
              {activeType === 'expense' && (
                <div className={style.formField}>
                  <CustomSelect
                    options={categories}
                    value={values.category}
                    onChange={(selectedCategory) =>
                      setFieldValue('category', selectedCategory)
                    }
                    placeholder="Select a category"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className={style.errorMessage}
                  />
                </div>
              )}

              <div className={style.formRow}>
                <div className={style.formField}>
                  <Field
                    type="text"
                    name="sum"
                    placeholder="0.00"
                    className={style.input}
                  />
                  <ErrorMessage
                    name="sum"
                    component="div"
                    className={style.errorMessage}
                  />
                </div>

                <div className={style.formField}>
                  <div className={style.dateInputWrapper}>
                    <DatePicker
                      selected={values.date}
                      onChange={(date) => setFieldValue('date', date)}
                      dateFormat="dd.MM.yyyy"
                      className={style.dateInput}
                      maxDate={new Date()}
                    />
                    <IconSvg
                      className={style.dateIcon}
                      name="icon-calendar"
                      width={24}
                      height={24}
                    />
                  </div>
                  <ErrorMessage
                    name="date"
                    component="div"
                    className={style.errorMessage}
                  />
                </div>
              </div>

              <div className={style.formField}>
                <Field
                  type="text"
                  name="comment"
                  placeholder="Comment"
                  className={style.input}
                />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className={style.errorMessage}
                />
              </div>
            </div>

            <div className={style.buttonGroup}>
              <button type="submit" className={style.saveButton}>
                ADD
              </button>
              <button
                type="button"
                onClick={onClose}
                className={style.cancelButton}
              >
                CANCEL
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTransactionForm;
