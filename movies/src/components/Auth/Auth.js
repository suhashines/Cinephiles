import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'

const Auth = (props) => {
  const dispatch = useDispatch();
  const getData = (data) => {    
    console.log("Auth", data);
    sendUserAuthRequest(data.inputs, data.signup)
    .then((res) => console.log(res))
    .then(() => dispatch(userActions.login()))
    .catch((err) => console.log(err));  
  }

  return (
    <div>
      <AuthForm setValue={props.setValue} prevValue={props.prevValue} onSubmit={getData} isAdmin={false}/>
    </div>    
  )
}

export default Auth