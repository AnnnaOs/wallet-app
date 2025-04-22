import s from './ContactList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { MdMarkEmailRead } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import { selectIsError, selectIsLoading } from '../../redux/contactsSlice.js';
import { fetchCurrentUserThunk, editCurrentUserThunk } from '../../redux/user/operations.js';
import Loader from '../Loader/Loader.jsx'
import  ErrorMessage  from '../ErrorMessage/ErrorMessage.jsx';



const CurrentUser = ({name, email, password, balance, avatarUrl}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCurrentUserThunk());
    }, [dispatch]);
    const isError = useSelector(selectIsError);
    const isLoading = useSelector(selectIsLoading);
    return (
        <>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        <ul className={s.list}>
        <li className={s.container}>
                <span className={s.item}>  
                    <p className={s.text}>{name}</p>
                </span>
                <span className={s.notesMain}>
                <span className={s.notes}>
           
                <button type='button' className={s.buttonContactIcon} onClick={() => {
                    const newAvatar = prompt('Enter new avatar URL:', avatarUrl);
                    
                    if (newAvatar.trim()) {
                        dispatch(editCurrentUserThunk({ id, avatar: newAvatar }));
                    }
                } }><FaUserEdit /></button>
                </span>
                </span>
                </li>  

        <li className={s.container}>
                <span className={s.item}>  
                    <FaUser className={s.icons}/>
                    <p className={s.text}>{name}</p>
                </span>
                <span className={s.notesMain}>
                <span className={s.notes}>
               
                <button type='button' className={s.buttonContactIcon} onClick={() => {
                    const newName = prompt('Enter new name: ', name);
                    
                    if (newName.trim()) {
                        dispatch(editCurrentUserThunk({ id, name: newName }));
                    }
                } }><FaUserEdit /></button>
                </span>
                </span>
        
        </li>

        <li className={s.container}>
                <span className={s.item}>
                   <MdMarkEmailRead className={s.icons}/>
                    <p className={s.text}>{email}</p>
                </span>
                <span className={s.notesMain}>
                <span className={s.notes}>
               
                <button type='button' className={s.buttonContactIcon} onClick={() => {
                    const newEmail = prompt('Enter new email: ', email);
                    if (newEmail.trim()) {
                        dispatch(editCurrentUserThunk({ id, email: newEmail }));
                    }
                } }><FaUserEdit /></button>
                </span>
                </span>
        </li>

        <li className={s.container}>
                <span className={s.item}>
                   <RiLockPasswordLine className={s.icons}/>
                    <p className={s.text}>{password}</p>
                </span>
                <span className={s.notesMain}>
                <span className={s.notes}>
               
                <button type='button' className={s.buttonContactIcon} onClick={() => {
                    const newPassword = prompt('Enter new password: ', password);
                    if (newPassword.trim()) {
                        dispatch(editCurrentUserThunk({ id, password: newPassword }));
                    }
                } }><FaUserEdit /></button>
                </span>
                </span>
        </li>

        <li className={s.container}>
                <span className={s.item}>
                   <MdAccountBalanceWallet className={s.icons}/>
                    <p className={s.text}>{balance}</p>
                </span>
                <span className={s.notesMain}>
                <span className={s.notes}>
               
                <button type='button' className={s.buttonContactIcon} onClick={() => {
                    const newBalance = prompt('Enter new balance: ', balance);
                    if (newBalance.trim()) {
                        dispatch(editCurrentUserThunk({ id, balance: newBalance }));
                    }
                } }><FaUserEdit /></button>
                </span>
                </span>
        </li>
        </ul>
        </>       
    )
}
export default CurrentUser;