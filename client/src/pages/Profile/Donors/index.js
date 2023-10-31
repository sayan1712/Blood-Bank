import React from 'react'
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { getDateFormat } from '../../../utils/helpers';
import { GetAllDonarsOfAnOrganization } from '../../../apicalls/users';
import { Modal, Form,Input,Radio, message, Table } from 'antd'; 


export default function Donors() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const dispatch = useDispatch();

    const columns =[{
title: "Name",
dataIndex: "name" ,
render: (text) => text.toUpperCase()
},{
title: "Email",
dataIndex: "email",
render: (text) => text.toUpperCase()
},{
title: "Phone",
dataIndex: "phone",


},  {
    title: "Created At",
    dataIndex: "createdAt",
    render: (text) => getDateFormat(text)
}]

 
    const getData = async()=>{
try {
    dispatch(SetLoading(true));
    const response = await GetAllDonarsOfAnOrganization();
    console.log(response.data)
    dispatch(SetLoading(false));
    if (response.success) {
    setData(response.data) ;
    } else {
        throw new Error(response.message);
        }
    }
         catch(error) {
    message.error(error.message)
        dispatch(SetLoading(false));

}
    }

    React.useEffect(()=>{
        getData()
    }, [])

  return (
    <div>
        <div className='flex justify-end'>
            <Button type="default" onClick ={()=> setOpen(true)}>Add Inventory</Button>
        </div>
        <Table columns={columns} dataSource={data} className="mt-3"/>
        
      
    </div>
  )
}
