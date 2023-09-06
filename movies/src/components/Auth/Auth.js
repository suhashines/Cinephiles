import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'

const Auth = (props) => {
  const dispatch = useDispatch();
  // const onResRecieve = (data) => {
  //   console.log(data);
  //   if(data.success) dispatch(userActions.login());
  //   props.setSuccess(data.success);
  //   props.setMessage(data.message);
  //   if(data.success) localStorage.setItem('userId', data.userToken); 
  //   return data.success;   
  // }
  // const getData = async (data) => {    
  //   console.log("Auth", data);
  //   sendUserAuthRequest(data.inputs, data.signup)
  //   .then(onResRecieve)
  //   .catch((err) => console.log(err));
  //   console.log("onResRecieve.success", onResRecieve.success)
  //   return onResRecieve;  
  // }

  const getData = async (data) => {    
    try {
      console.log("Auth", data);
  
      const res = await sendUserAuthRequest(data.inputs, data.signup);
      console.log(res);
  
      // if (res.success) {
      //   dispatch(userActions.login());
      // }
  
      props.setSuccess(res.success);
      props.setMessage(res.message);

      console.log(res.token);
  
      if (res.success && !data.signup) {
        dispatch(userActions.login());
        localStorage.setItem('userId', res.token);
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

export default Auth