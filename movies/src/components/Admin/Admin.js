import React from 'react'
import AuthForm from '../Auth/AuthForm' 
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../store';

const Admin = (props) => {
  const dispatch = useDispatch();
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
    .then((res) => console.log(res))
    .then(() => dispatch(adminActions.login()))
    .catch((err) => console.log(err));
  };

  return (
    <div>
      <AuthForm setValue={props.setValue} prevValue={props.prevValue} onSubmit={getData} isAdmin={true}/>
    </div>
  )
}

export default Admin