"use client"
import React,{useState} from 'react'
import Form from "@components/Form"
import Navbar from "@components/Navbar"

const Editwork = () => {
    
  return (
    <>
      <Navbar />
      <Form type="Edit"  work={work} setWork={setWork}>
      
       

      </Form>
    </>
  )
}

export default Editwork
