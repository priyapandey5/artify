"use client"
import React, { useEffect } from 'react'
import "../../styles/Register.scss"
import {FcGoogle} from 'react-icons/fc'
import { signIn } from "next-auth/react";
import { useState } from 'react'
import { useRouter } from '@node_modules/next/navigation'
import { CldUploadButton } from '@node_modules/next-cloudinary/dist';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:"",
    profileImage:null, //bcz we pass the photi not filepath
  });
  // const uploadPhoto = (result) => {
  //   SetValue("profileImage", result?.info?.secure_url);
  // }
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value, files} = e.target
    setFormData({...formData, [name]:value, [name]: name === "profileImage" ? files[0] : value,});
  };
  console.log(formData);
   
  const [passwordMatch, setPasswordMatch] = useState(true)
  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmpassword || formData.confirmpassword === "")
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const registerForm = new FormData(); //this formdata from frontend
      for(var key in formData){
        registerForm.append(key, formData[key])
      }
      const response = await fetch("/api/register/",{
        method:"POST",
        body:registerForm,
      });
      if(response.ok){
        router.push("/")
      }
    }catch(err){
     console.log("Registration failed", err.message)
    }
  }

  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };
  
  return (
    <div className='register'>
     <img src= "/assets/register.jpg" alt='register' className='register_decor'/>
     <div className='register_content'>
         <form className='register_content_form' onSubmit={handleSubmit}>
             <input placeholder='Username' name='username' value={formData.username} onChange={handleChange} required/>
              <input placeholder='Email' type='email' name='email' value={formData.email} onChange={handleChange} required/>
              <input placeholder='Password' type='password' name='password' value={formData.password} onChange={handleChange} required/>
               <input placeholder='Confirm Password' type='password' name='confirmpassword' value={formData.confirmpassword} onChange={handleChange} required/>
               {/* {!passwordMatch && ( <p style={{color:"red"}}>Password are not matched!</p>)}
               <input id='image' type='file' name='profileImage' onChange={handleChange} accept='image/*' style={{display:"none"}}  required/> */}
               <label htmlFor='image'> 
                 <img src='/assets/addImage.png' alt='add profile' />
                 <CldUploadButton options={{maxFiles:1}}   uploadPreset='qwerty'>
                  <p>Upload the Profile Photo</p>
                  </CldUploadButton>
               </label>
               {/* {formData.profileImage && (
                <img src={URL.createObjectURL(formData.profileImage)} alt="Profile" style={{maxWidth:"50px", maxHeight: "100px"}}/>
                )} */}
               <button type="submit" disabled={!passwordMatch}>Register</button>
          </form>
           <button type='button' onClick={() => loginWithGoogle() } className='google'><p>Log in with Google</p> <FcGoogle /></button>
           <a href='/login'>Already have an account? Log In Here</a>
        </div>
    </div>
  )
}

export default Register
