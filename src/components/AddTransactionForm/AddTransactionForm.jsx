import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { getCategories } from '../../redux/categories/selectors.js';
import { createTransaction } from '../../redux/transactions/operations.js';
import IconSvg from '../IconSvg/IconSvg.jsx';
import CustomSelect from '../EditTransactionForm/CustomSelect.jsx';
import style from './AddTransactionForm.module.css';

const FeedbackSchema = Yup.object().shape({
  transactionType: Yup.string().required('Виберіть тип транзакції'),
  category: Yup.string().required('Виберіть категорію'),
  sum: Yup.number().typeError('Має бути число').required('Це поле обов`язкове').positive().max(1000000),
  date: Yup.date().required('Виберіть дату'),
  comment: Yup.string().min(3, 'Занадто коротко!').max(20, 'Занадто довго!').required('Обовʼязково'),
});

const AddTransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

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
      category: values.transactionType === 'income' ? 'Income' : values.category,
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
      <Formik initialValues={initialValues} validationSchema={FeedbackSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue, resetForm }) => (
          <Form className={style.form}>
            <div className={style.switcher}>
              <p
                className={`${style.picker} ${values.transactionType === 'income' ? style.pickerIncomeActive : ''}`}
                onClick={() => {
                  setFieldValue('transactionType', 'income');
                  setFieldValue('category', 'Income');
                }}
              >
                Income
              </p>
              <div className={style.switchWrapper}>
                <label className={`${style.switchButton} ${values.transactionType === 'income' ? style.incomeActive : ''}`}>
                  <Field
                    type="radio"
                    name="transactionType"
                    value="income"
                    className={style.hiddenRadio}
                    onClick={() => {
                      setFieldValue('category', 'Income');
                    }}
                  />
                  <IconSvg className={style.icon} width={20} height={20} name="icon-plus" />
                </label>
                <label className={`${style.switchButton} ${values.transactionType === 'expense' ? style.expenseActive : ''}`}>
                  <Field
                    type="radio"
                    name="transactionType"
                    value="expense"
                    className={style.hiddenRadio}
                    onClick={() => {
                      setFieldValue('category', '');
                    }}
                  />
                  <IconSvg className={style.icon} width={20} height={20} name="icon-minus" />
                </label>
              </div>
              <p
                className={`${style.picker} ${values.transactionType === 'expense' ? style.pickerExpenseActive : ''}`}
                onClick={() => {
                  setFieldValue('transactionType', 'expense');
                  setFieldValue('category', '');
                }}
              >
                Expense
              </p>
            </div>

            <div className={style.formFields}>
              {values.transactionType === 'expense' && (
                <div className={style.formField}>
                  <CustomSelect
                    options={categories.expenses || []}
                    value={values.category}
                    onChange={selected => setFieldValue('category', selected)}
                    placeholder="Select a category"
                  />
                  <ErrorMessage name="category" component="span" className={style.errorMessage} />
                </div>
              )}

              <div className={style.formRow}>
                <div className={style.formField}>
                  <Field type="text" name="sum" className={style.input} placeholder="0.00" />
                  <ErrorMessage name="sum" component="span" className={style.errorMessage} />
                </div>

                <div className={style.formField}>
                  <div className={style.dateInputWrapper}>
                    <DatePicker
                      selected={values.date}
                      onChange={date => setFieldValue('date', date)}
                      dateFormat="dd.MM.yyyy"
                      className={style.dateInput}
                      calendarClassName={style.calendarContainer}
                      maxDate={new Date()}
                      dayClassName={date => (date.getDay() === 0 || date.getDay() === 6 ? style.weekendDay : undefined)}
                    />
                    <IconSvg className={style.dateIcon} name="icon-calendar" width={24} height={24} />
                  </div>
                  <ErrorMessage name="date" component="div" className={style.errorMessage} />
                </div>
              </div>

              <div className={style.formField}>
                <Field type="text" name="comment" className={style.inputComment} placeholder="Comment" />
                <ErrorMessage name="comment" component="span" className={style.errorMessage} />
              </div>
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
