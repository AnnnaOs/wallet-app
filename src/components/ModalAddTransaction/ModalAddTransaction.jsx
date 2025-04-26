import { useDispatch } from 'react-redux';
import { addTransaction } from '../../redux/transactions/operations.js'; // Подключаем операцию
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect, useId } from "react";
import * as Yup from "yup";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { api } from '../../configAPI/api.js';


const FeedbackSchema = Yup.object().shape({
  transactionType: Yup.string().required('Виберіть тип транзакції'),
  category: Yup.string().required('Виберіть категорію'),
  sum: Yup.number()
    .typeError('Сумма должна быть числом')
    .required('Це поле обов`язкове')
    .positive('Сумма должна быть положительной')
    .max(1000000, "Слишком большая сумма!"),
  date: Yup.date().required('Виберіть дату'),
  transactionname: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required('Required')
    .trim('Не должно быть пустым!'),
});

const AddTransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const categorieFieldId = useId();
  const sumFieldId = useId();
  const dateFieldId = useId();
  const transactionnameFieldId = useId();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const initialValues = {
    transactionType: 'income',
    category: '',
    sum: '0',
    date: new Date(),
    transactionname: '',
  };

  const handleSubmit = (values, actions) => {
    const newTransaction = {
      type: values.transactionType,
      category: values.category,
      sum: values.sum,
      date: values.date,
      transaction: values.transactionname,
    };
    dispatch(addTransaction(newTransaction)); // Диспатчим добавление транзакции
    actions.resetForm();
    onClose();
  };

  return (
    <div className={style.overlay}> {/* Оверлей */}
      <div className={style.modal}>
        <Formik
          validationSchema={FeedbackSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ values, resetForm }) => (
            <Form className={style.container}>
              {/* Заголовок */}
              <h2 className={style.title}>Add transaction</h2>

              {/* Switcher Income / Expense */}
              <div className={style.switchWrapper}>
                <label className={`${style.switchButton} ${values.transactionType === 'income' ? style.active : ''}`}>
                  <Field type="radio" name="transactionType" value="income" className={style.hiddenRadio} />
                  Income
                </label>
                <label className={`${style.switchButton} ${values.transactionType === 'expense' ? style.active : ''}`}>
                  <Field type="radio" name="transactionType" value="expense" className={style.hiddenRadio} />
                  Expense
                </label>
              </div>

              {/* Select Category */}
              <div className={style.dataContainer}>
                <label htmlFor={categorieFieldId}>Category</label>
                <Field as="select" name="category" id={categorieFieldId} className={style.typing}>
                  <option value="" disabled>-- Select category --</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.value}>{cat.label}</option>
                  ))}
                </Field>
                <ErrorMessage className={style.msg} name="category" component="span" />
              </div>

              {/* Input Sum */}
              <div className={style.dataContainer}>
                <label htmlFor={sumFieldId}>Sum</label>
                <Field type="text" name="sum" id={sumFieldId} className={style.typing} />
                <ErrorMessage className={style.msg} name="sum" component="span" />
              </div>

              {/* Input Date */}
              <div className={style.dataContainer}>
                <label htmlFor={dateFieldId}>Date</label>
                <Field name="date">
                  {({ field, form }) => (
                    <DatePicker
                      id={dateFieldId}
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => form.setFieldValue("date", date)}
                      dateFormat="yyyy-MM-dd"
                      className={style.typing}
                      placeholderText="Select a date"
                    />
                  )}
                </Field>
                <ErrorMessage className={style.msg} name="date" component="span" />
              </div>

              {/* Input Name */}
              <div className={style.dataContainer}>
                <label htmlFor={transactionnameFieldId}>Transaction</label>
                <Field type="text" name="transactionname" id={transactionnameFieldId} className={style.typing} />
                <ErrorMessage className={style.msg} name="transactionname" component="span" />
              </div>

              {/* Buttons */}
              <div className={style.buttonWrapper}>
                <button type="submit" className={style.buttonAdd}>ADD</button>
                <button type="button" onClick={() => { resetForm(); onClose(); }} className={style.buttonCancel}>
                  CANCEL
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTransactionForm;
