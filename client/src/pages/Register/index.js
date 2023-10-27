
import {Form,Input,Button,Radio,message} from 'antd'

import React from 'react'
import OrgHospitalForm from './OrgHospitalForm'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../apicalls/users'
import { useEffect } from 'react'
import { getAntdInputValidation } from '../../utils/helpers'


export default function Register() {
  const [type,setType]=React.useState('Donor')
  const navigate = useNavigate()

  const onFinish = async(values)=>{
    try {
      const response = await RegisterUser({
        ...values,
        userType: type,
      })
        
      if(response.success){
        message.success(response.message);
        navigate("/login");
      } else{
        throw new Error(response.message);

      }
      
    } catch (error) {
      message.error(error.message);

      
    }
  };
  // useEffect(()=>{
  //   if (localStorage.getItem("token")){
  //     navigate("/")
  //   }
  // },[])
  
  
  
  return (
    <div className="flex h-screen items-center justify-center  bg-red-200">
     <Form
     layout = "vertical" className='bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2'
     onFinish={onFinish}
     >
      
      <h1 className='col-span-2 uppercase text-xl'>
        <span className='text-primary'>
          {type.toUpperCase()} - REGISTRATION
        </span>
        <hr />
      </h1>
      <Radio.Group onChange={(e)=> setType(e.target.value)} value={type}
      className='col-span-2'>
        <Radio value="Donor">Donor</Radio>
        <Radio value="Organization">Organization</Radio>
        <Radio value="Hospital">Hospital</Radio>
      </Radio.Group>
     {type==='Donor' && (
      <>
      { " "}
      <Form.Item label="Name" name="name" rules={getAntdInputValidation('Name')}>
         <Input />
         </Form.Item>
         <Form.Item label="Email" name="email" rules={getAntdInputValidation('Email')}>
         <Input />
         </Form.Item>
         <Form.Item label="Phone" name="phone" rules={getAntdInputValidation('Phone')}>
         <Input />
         </Form.Item>
         
         <Form.Item label="Password" name="password" rules={getAntdInputValidation('Password')}>
  <Input type="password"/>
</Form.Item>


         
         
         </>
      
     )}
     {type !=="Donor" && <OrgHospitalForm type={type}/>}
        <Button className="bg-blue-500 hover:bg-blue-200 text-white col-span-2 font-bold py-2 px-4 rounded" htmlType='Submit'>
          Register</Button>
        <Link to="/login" className='col-span-2 text-center text-gray-700 underline'>Already have an account?Login</Link> 
        </Form>
    </div>
  )
}