import React from 'react'
import AuthForm from '../Auth/AuthForm' 
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../store';

const Admin = (props) => {
  const dispatch = useDispatch();
  // const onResRecieve = (data) => {
  //   console.log(data);
  //   if(data.success) dispatch(adminActions.login());
  //   props.setSuccess(data.success);
  //   props.setMessage(data.message);
  //   localStorage.setItem('adminId', data.id);
  //   localStorage.setItem('adminToken', data.token);
  // }
  // const getData = (data) => {
  //   console.log("Admin", data);
  //   sendAdminAuthRequest(data.inputs, data.signup)
  //   .then(onResRecieve)
  //   .catch((err) => console.log(err));
  // };

  const getData = async (data) => {    
    try {
      console.log("Admin", data);
  
      const res = await sendAdminAuthRequest(data.inputs, data.signup);
      console.log(res);
  
      // if (res.success) {
      //   dispatch(userActions.login());
      // }
  
      props.setSuccess(res.success);
      props.setMessage(res.message);
  
      if (res.success && !data.signup) {
        dispatch(adminActions.login());
        localStorage.setItem('adminId', res.token);
      }
  
      console.log("res.success", res.success);
      
      return res.success; // Return the 'success' property from the response
    } catch (err) {
      console.error(err);
      throw err; // Re-throw the error if needed
    }
  }

  return (
    <div>
      <AuthForm 
        setValue={props.setValue} 
        prevValue={props.prevValue} 
        onSubmit={getData} 
        isAdmin={props.isAdmin} 
        setIsAdmin={props.setIsAdmin}
        isAdminLoggedIn={props.isAdminLoggedIn}
        isUserLoggedIn={props.isUserLoggedIn}
        success={props.success}
        message={props.message}
        setMessage={props.setMessage}
        setSuccess={props.setSuccess}
      />
    </div>
  )
}

export default Admin