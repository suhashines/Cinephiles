// import React, { useEffect, useState } from 'react'
// import { editProfile } from '../../api-helpers/api-helpers';
// import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';

// const EditProfile = () => {
//     const labelStyle = {mt:1, mb:1}

//     const [inputs, setInputs] = useState({
//         u_id:localStorage.getItem('userId'),
//         name:"",
//         email:"",
//         gender:"",
//         mobile:""
//     })

//     const [message, setMessage] = useState("");

//     const handleChange = (e) => {
//         setInputs((prevState)=>({
//             ...prevState,
//             [e.target.name]:e.target.value
//         }))
//     }

//     useEffect(()=>{
//         setMessage(message);
//     },[message])

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         let editSuccess;

//         try{
//             editSuccess = await editProfile(inputs);
//             setMessage(editSuccess.message);
//         }catch(err){
//             console.log(err);
//         }

//         if(editSuccess.success){
//             setInputs({
//                 name:"",
//                 email:"",
//                 gender:"",
//                 mobile:""
//               });
//         }
        
//         // console.log("Change", changeSuccess);
//     };

//   return (
//     <form onSubmit={handleSubmit}>
//         <Box
//             display={"flex"}
//             flexDirection={"column"}
//             justifyContent={"center"}
//             alignItems={"center"}
//             width={'100%'}
//             // height={'100%'}
//             margin={"auto"}
//             marginTop={10}
//             // padding={6}
//             >
//             <FormLabel sx={{labelStyle}}>Name</FormLabel>
//             <TextField
//                 value={inputs.name}
//                 onChange={handleChange}
//                 sx={{bgcolor:'white', width:'60%'}}
//                 variants={"standard"} 
//                 margin={"normal"}  
//                 type={"text"} 
//                 name="name"
//             />
//             <FormLabel sx={labelStyle}>New Password</FormLabel>
//             <TextField
//                 value={inputs.newPassword}
//                 onChange={handleChange}
//                 sx={{bgcolor:'white', width:'60%'}} 
//                 variants={"standard"} 
//                 margin={"normal"}  
//                 type={"password"} 
//                 name="newPassword"
//             />
//             <FormLabel sx={labelStyle}>Confirm Password</FormLabel>
//             <TextField
//                 value={inputs.confirmPassword}
//                 onChange={handleChange}
//                 sx={{bgcolor:'white', width:'60%'}} 
//                 variants={"standard"} 
//                 margin={"normal"}  
//                 type={"password"} 
//                 name="confirmPassword"
//             />
            
//             <Button 
//                 sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42", color:"white", marginTop:3,
//                 '&:hover': {backgroundColor: '#7c4699', borderColor: '#7c4699', color:"#e3e4e6"}}} 
//                 type='submit'
//                 variant={"contained"}
                 
//                 // width={"200%"}
//                 >
//                     {"Confirm Submission"}
//             </Button>

//             <Typography variant="h6" color={'red'} textAlign={"center"} marginTop={2}>
//                 {message}
//             </Typography>                                
//         </Box>
//     </form>
//   )
// }

// export default EditProfile