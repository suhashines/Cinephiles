import React from 'react'
import AuthForm from '../Auth/AuthForm' 
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../store';

const Admin = (props) => {
  const dispatch = useDispatch();
  const onResRecieve = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem('adminId', data.id);
    localStorage.setItem('adminToken', data.token);
  }
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs, data.signup)
    .then(onResRecieve)
    .catch((err) => console.log(err));
  };

  return (
    <div>
      <AuthForm setValue={props.setValue} prevValue={props.prevValue} onSubmit={getData} isAdmin={true}/>
    </div>
  )
}

export default Admin