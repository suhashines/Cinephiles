import React from 'react'
import AuthForm from '../Auth/AuthForm' 
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers';

const Admin = (props) => {
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  };

  return (
    <div>
      <AuthForm setValue={props.setValue} prevValue={props.prevValue} onSubmit={getData} isAdmin={true}/>
    </div>
  )
}

export default Admin