
import {Form,Input,Button,Radio, message} from 'antd'


import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../apicalls/users'

import{ getAntdInputValidation } from '../../utils/helpers'






export default function Login() {
  const [type,setType]=React.useState('Donor')
  const navigate = useNavigate()
 

  const onFinish = async(values)=>{
    try {
      const response = await LoginUser(values);
     
      if (response.success){
        message.success(response.message);
        localStorage.setItem("token",response.data);
        navigate("/");
      } else{
        throw new Error(response.message);
      }
      
    } catch (error) {
     
      message.error(error.message);
      
    }
    
  };
 
  
  return (
    <div className="flex h-screen items-center justify-center  bg-red-200">
     <Form
     layout = "vertical" className='bg-white rounded shadow grid  p-5 gap-5 w-1/3'
     onFinish={onFinish}
     >
      
      <h1 className=' uppercase text-xl'>
        <span className='text-primary'>
          {type.toUpperCase()} - LOGIN
        </span>
        <hr />
      </h1>
      <Radio.Group onChange={(e)=> setType(e.target.value)} value={type}
      className='col-span-2'>
        <Radio value="Donor">Donor</Radio>
        <Radio value="Organization">Organization</Radio>
        <Radio value="Hospital">Hospital</Radio>
      </Radio.Group>
    
      { " "}
      
         <Form.Item label="Email" name="email" rules={getAntdInputValidation('Email')}>
          
         <Input />
         </Form.Item>
         <Form.Item label="Password" name="password" rules={getAntdInputValidation('Password')}>
         <Input type="password"/>
         </Form.Item>
         
         
       
     
        <Button className="bg-blue-500 hover:bg-blue-200 text-white col-span-2 font-bold py-2 px-4 rounded" htmlType='Submit'>
          Login</Button>
       <Link to='/register' className='col-span-2 text-center text-gray-700 underline'>Don't have an account? Register</Link>
          
        </Form>
    </div>
  )
}
