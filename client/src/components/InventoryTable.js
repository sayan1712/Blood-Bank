import React from 'react'
import { GetInventoryWithFilters } from '../apicalls/inventory';
import { Modal, Form,Input,Radio, message, Table } from 'antd'; 
import { useDispatch } from 'react-redux';
import { SetLoading } from '../redux/loadersSlice';
import { getDateFormat } from '../utils/helpers';
import { Button } from 'antd';

export default function InventoryTable({filters, userType, limit}) {
  const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const dispatch = useDispatch();
    const columns =[{
title: "Inventory Type",
dataIndex: "inventoryType" ,
render: (text) => text.toUpperCase()
},{
title: "Blood Group",
dataIndex: "bloodGroup",
render: (text) => text.toUpperCase()
},{
title: "Quantity",
dataIndex: "quantity",
render: (text) => text + " ML"

}, {
title: "Reference",
dataIndex: "reference", 
render: (text, record) =>  record.organization.name


}, {
    title: "Date",
    dataIndex: "createdAt",
    render: (text) => getDateFormat(text)
}]

    const getData = async()=>{
try {
    dispatch(SetLoading(true));
    const response = await GetInventoryWithFilters(filters, limit);
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
  return (<div>
     <Table columns={columns} dataSource={data} className="mt-3"/></div>
  )
}