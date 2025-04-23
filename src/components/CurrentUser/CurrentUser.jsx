import s from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { MdMarkEmailRead } from "react-icons/md";
import { FaUser, FaUserEdit } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import { selectUser, selectIsLoading, selectIsError } from '../../redux/user/selectors';
import { fetchCurrentUserThunk, editCurrentUserThunk } from '../../redux/user/operations';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const CurrentUser = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(fetchCurrentUserThunk());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;

  if (!user) return null;

  const { _id: id, name, email, password, balance, avatarUrl } = user;

  return (
    <ul className={s.list}>
      <li className={s.container}>
        <span className={s.item}>
          <FaUser className={s.icons} />
          <p className={s.text}>{name}</p>
        </span>
        <span className={s.notesMain}>
          <button
            type="button"
            className={s.buttonContactIcon}
            onClick={() => {
              const newName = prompt('Enter new name:', name);
              if (newName?.trim()) {
                dispatch(editCurrentUserThunk({ id, name: newName }));
              }
            }}
          >
            <FaUserEdit />
          </button>
        </span>
      </li>

      <li className={s.container}>
        <span className={s.item}>
          <MdMarkEmailRead className={s.icons} />
          <p className={s.text}>{email}</p>
        </span>
        <span className={s.notesMain}>
          <button
            type="button"
            className={s.buttonContactIcon}
            onClick={() => {
              const newEmail = prompt('Enter new email:', email);
              if (newEmail?.trim()) {
                dispatch(editCurrentUserThunk({ id, email: newEmail }));
              }
            }}
          >
            <FaUserEdit />
          </button>
        </span>
      </li>

      <li className={s.container}>
        <span className={s.item}>
          <RiLockPasswordLine className={s.icons} />
          <p className={s.text}>{password}</p>
        </span>
        <span className={s.notesMain}>
          <button
            type="button"
            className={s.buttonContactIcon}
            onClick={() => {
              const newPassword = prompt('Enter new password:', password);
              if (newPassword?.trim()) {
                dispatch(editCurrentUserThunk({ id, password: newPassword }));
              }
            }}
          >
            <FaUserEdit />
          </button>
        </span>
      </li>

      <li className={s.container}>
        <span className={s.item}>
          <MdAccountBalanceWallet className={s.icons} />
          <p className={s.text}>{balance}</p>
        </span>
        <span className={s.notesMain}>
          <button
            type="button"
            className={s.buttonContactIcon}
            onClick={() => {
              const newBalance = prompt('Enter new balance:', balance);
              if (newBalance?.trim()) {
                dispatch(editCurrentUserThunk({ id, balance: newBalance }));
              }
            }}
          >
            <FaUserEdit />
          </button>
        </span>
      </li>

      <li className={s.container}>
        <span className={s.item}>
          <img src={avatarUrl} alt="avatar" className={s.avatar} />
        </span>
        <span className={s.notesMain}>
          <button
            type="button"
            className={s.buttonContactIcon}
            onClick={() => {
              const newAvatar = prompt('Enter new avatar URL:', avatarUrl);
              if (newAvatar?.trim()) {
                dispatch(editCurrentUserThunk({ id, avatarUrl: newAvatar }));
              }
            }}
          >
            <FaUserEdit />
          </button>
        </span>
      </li>
    </ul>
  );
};

export default CurrentUser;
