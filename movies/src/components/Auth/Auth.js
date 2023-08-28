import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'

const Auth = (props) => {
  const dispatch = useDispatch();
  const onResRecieve = (data) => {
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem('userId', data.userToken);
  }
  const getData = (data) => {    
    console.log("Auth", data);
    sendUserAuthRequest(data.inputs, data.signup)
    .then(onResRecieve)
    .catch((err) => console.log(err));  
  }

  return (
    <div>
      <AuthForm setValue={props.setValue} prevValue={props.prevValue} onSubmit={getData} isAdmin={false}/>
    </div>    
  )
}

export default Auth