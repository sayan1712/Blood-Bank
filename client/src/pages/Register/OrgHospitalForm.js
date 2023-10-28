
import {Form,Input} from "antd"
import React from 'react'
import { getAntdInputValidation } from "../../utils/helpers"
export default function OrgHospitalForm({type}) {
  return (
    <>
    <Form.Item
    label={type==="Hospital" ? "Hospital Name" : "Organization Name"}
    name="name" rules={getAntdInputValidation('Name')}
    > 
      
    <Input/>

    </Form.Item>
    
    <Form.Item name="owner" label="Owner">
      <Input/>
    </Form.Item>
    <Form.Item name="email" label="Email" rules={getAntdInputValidation('Email')}>
      <Input/>
    </Form.Item>
    <Form.Item label="Password" name="password" rules={getAntdInputValidation('Password')}>
  <Input type="password" />
</Form.Item>


    <Form.Item name="website" label="Website">
      <Input/>
    </Form.Item>
    <Form.Item name="phone" label="Phone" rules={getAntdInputValidation('Phone')}>
      <Input/>
    </Form.Item>
    <Form.Item name="address" label="Address">
      <Input/>
    </Form.Item>
    </>
   
  )
}