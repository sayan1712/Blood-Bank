import React, { useState } from 'react'
import { Modal, Form,Input,Radio, message } from 'antd'; 
import {getAntdInputValidation} from "../../../utils/helpers";
import { useDispatch } from 'react-redux';
import { AddInventory } from '../../../apicalls/inventory';
import { SetLoading } from '../../../redux/loadersSlice';


export default function InventoryForm({open, setOpen, reloadData}) {
    const[form] = Form.useForm();
    const[inventoryType,setInventoryType]= useState("IN");
    const dispatch = useDispatch();
    const onFinish = async(values) => {
        try {
            dispatch(SetLoading(true))
            const response= await AddInventory({
                ...values,
                inventoryType,
            });
            dispatch(SetLoading(false));
            if(response.success){
                message.success("Inventory Added Successfully")
                setOpen(false)
            }
            else{
                throw new Error(response.message)

            }
            
        } catch (error) {
            message.error(error.message);
            dispatch(SetLoading(false))
            
        }
        
    }
  return (
    <Modal title="ADD INVENTORY" open={open} onCancel={()=> setOpen(false)} centered
    onOk={()=> {form.submit();}}
    >
        <Form
        layout="vertical" className="flex flex-col gap-3" form={form}
        onFinish={onFinish} >
            <Form.Item 
            label="Inventory Type">
                <Radio.Group 
                value={inventoryType}
                onChange={(e)=> setInventoryType(e.target.value)}>
                    <Radio value="IN"></Radio>
                    <Radio value="OUT"></Radio>

                </Radio.Group>
            </Form.Item>
            <Form.Item label = "Blood Group" name="bloodgroup" rules={getAntdInputValidation()}>
                <select name="" id="">
                    <option value="a+">A+</option>
                    <option value="a-">A-</option>
                    <option value="b+">B+</option>
                    <option value="b-">B-</option>
                    <option value="ab+">AB+</option>
                    <option value="ab-">AB-</option>
                    <option value="o+">O+</option>
                    <option value="o-">O-</option>
                    
                    


                </select>
            </Form.Item>
            <Form.Item label ={inventoryType==="OUT"? "Hospital Email" : "Donor Email"}
            name="email" rules={getAntdInputValidation()} >
                <Input type="email"/>
            </Form.Item>
            <Form.Item label ="Quantity (ML)" name="quantity" rules={getAntdInputValidation()}><Input type="number"/></Form.Item>

        </Form>
    </Modal>
  
  );
}