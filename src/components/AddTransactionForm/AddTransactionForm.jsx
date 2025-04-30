import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTransaction } from '../../redux/transactions/operations.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './AddTransactionForm.module.css';
import { api } from '../../configAPI/api.js';
import IconSvg from '../IconSvg/IconSvg.jsx';
import CustomSelect from '../EditTransactionForm/CustomSelect.jsx';
import { toast } from 'react-toastify';

const FeedbackSchema = Yup.object().shape({
  transactionType: Yup.string().required('Выберіть тип транзакції'),
  category: Yup.string().required('Виберіть категорію'),
  sum: Yup.number()
    .typeError('Сумма должна быть числом')
    .required('Це поле обов`язкове')
    .positive('Сумма должна быть положительною')
    .max(1000000, 'Слишком велика сума!'),
  date: Yup.date().required('Виберіть дату'),
  comment: Yup.string()
    .min(3, 'Занадто коротко!')
    .max(20, 'Занадто довго!')
    .required('Обовʼязково')
    .trim('Не повинно бути пустим!'),
});

const AddTransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState({ expenses: [], income: [] });
  const [activeType, setActiveType] = useState('expense');

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error('Помилка при завантаженні категорій:', error);
      }
    }

    fetchCategories();
  }, []);

  const initialValues = {
    transactionType: 'expense',
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
      await dispatch(createTransaction(newTransaction)).unwrap();
      actions.resetForm();
      toast.success('Транзакцію додано успішно!');
      onClose();
    } catch (error) {
      console.error('Помилка при додаванні транзакції:', error);
      toast.error('Не вдалося додати транзакцію. Спробуйте ще раз.');
    }
  };

  return (
    <div className={style.modal}>
      <Formik
        initialValues={initialValues}
        validationSchema={FeedbackSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form className={style.form}>
            <div className={style.switcher}>
              <p className={style.picker}>Income</p>
              <div className={style.switchWrapper}>
                <label
                  className={`${style.switchButton} ${
                    values.transactionType === 'income' ? style.active : ''
                  }`}
                >
                  <Field
                    type="radio"
                    name="transactionType"
                    value="income"
                    className={style.hiddenRadio}
                    onClick={() => {
                      setActiveType('income');
                      setFieldValue('category', 'Income');
                    }}
                  />
                  <IconSvg
                    className={style.icon}
                    width={20}
                    height={20}
                    name="icon-plus"
                  />
                </label>
                <label
                  className={`${style.switchButton} ${
                    values.transactionType === 'expense' ? style.active : ''
                  }`}
                >
                  <Field
                    type="radio"
                    name="transactionType"
                    value="expense"
                    className={style.hiddenRadio}
                    onClick={() => {
                      setActiveType('expense');
                      setFieldValue('category', '');
                    }}
                  />
                  <IconSvg
                    className={style.icon}
                    width={20}
                    height={20}
                    name="icon-minus"
                  />
                </label>
              </div>
              <p className={style.picker}>Expense</p>
            </div>

            {/* Категория */}
            {values.transactionType === 'expense' && (
              <div className={style.formFields}>
                <CustomSelect
                  options={categories.expenses || []}
                  value={values.category}
                  onChange={selected => setFieldValue('category', selected)}
                  placeholder="Select a category"
                />
                <ErrorMessage
                  name="category"
                  component="span"
                  className={style.errorMessage}
                />
              </div>
            )}

            <div className={style.formRow}>
              {/* Сумма */}
              <div className={style.formField}>
                <Field
                  type="text"
                  name="sum"
                  className={style.input}
                  placeholder="0.00"
                />
                <ErrorMessage
                  name="sum"
                  component="span"
                  className={style.msg}
                />
              </div>

              {/* Дата */}
              <div className={style.formField}>
                <div className={style.dateInputWrapper}>
                  <DatePicker
                    selected={values.date}
                    onChange={date => setFieldValue('date', date)}
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

            {/* Комментарий */}
            <div className={style.formField}>
              <Field
                type="text"
                name="comment"
                className={style.input}
                placeholder="Comment"
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={style.errorMessage}
              />
            </div>

            <div className={style.buttonGroup}>
              <button type="submit" className={style.saveButton}>
                ADD
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
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
