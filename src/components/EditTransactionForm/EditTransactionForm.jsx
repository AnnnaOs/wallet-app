import { useDispatch } from 'react-redux';
import { updateTransaction } from '../../redux/transactions/operations.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './EditTransactionForm.module.css';
import { api } from '../../configAPI/api.js';
import IconSvg from '../IconSvg/IconSvg.jsx';
import CustomSelect from './CustomSelect.jsx';

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

const EditTransactionForm = ({ transaction, onClose }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState({ expenses: [], income: [] });
  const [activeType, setActiveType] = useState(
    transaction.type === 'Income' ? 'income' : 'expense'
  );
  // const [startDate, setStartDate] = useState(
  //   new Date(transaction.transactionDate)
  // );

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error('Не вдалося завантажити категорії:', error);
      }
    }
    fetchCategories();
  }, []);

  const initialValues = {
    transactionType: transaction.type === 'Income' ? 'income' : 'expense',
    category: transaction.category || '',
    sum: transaction.sum || '',
    date: transaction.date ? new Date(transaction.date) : new Date(),
    comment: transaction.comment || '',
  };

  const handleSubmit = (values, actions) => {
    const updatedTransaction = {
      id: transaction._id,
      type: values.transactionType === 'income' ? 'Income' : 'Expense',
      category:
        values.transactionType === 'income' ? 'Income' : values.category,
      sum: values.sum,
      date: values.date,
      comment: values.comment,
    };

    dispatch(updateTransaction(updatedTransaction));
    actions.resetForm();
    onClose();
  };

  return (
    <div className={style.formContainer}>
      <Formik
        validationSchema={FeedbackSchema}
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={style.form}>
            <div className={style.typeSelector}>
              <button
                type="button"
                className={`${style.typeButton} ${
                  activeType === 'income' ? style.activeIncome : ''
                }`}
                onClick={() => {
                  setActiveType('income');
                  setFieldValue('transactionType', 'income');
                }}
              >
                Income
              </button>
              <span className={style.typeDivider}>/</span>
              <button
                type="button"
                className={`${style.typeButton} ${
                  activeType === 'expense' ? style.activeExpense : ''
                }`}
                onClick={() => {
                  setActiveType('expense');
                  setFieldValue('transactionType', 'expense');
                }}
              >
                Expense
              </button>
            </div>

            <div className={style.formFields}>
              {activeType === 'expense' && (
                <div className={style.formField}>
                  <CustomSelect
                    options={categories.expenses || []}
                    value={values.category}
                    onChange={selectedCategory =>
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
                SAVE
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

export default EditTransactionForm;
