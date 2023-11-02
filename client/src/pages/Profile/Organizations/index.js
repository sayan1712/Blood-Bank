import React from 'react'
import { GetAllOrganizationsOfADonor, GetAllOrganizationsOfAHospital } from '../../../apicalls/users';
import { Modal, Form,Input,Radio, message, Table } from 'antd'; 
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { getDateFormat } from '../../../utils/helpers';
import { Button } from 'antd';
import { useSelector } from "react-redux";
import InventoryTable from '../../../components/InventoryTable'

function Organizations({ userType }){
  const [open, setOpen] = React.useState(false);
  const [showHistoryModel, setShowHistoryModel] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [selectedOrganization, setSelectedOrganization] = React.useState(null)
    const dispatch = useDispatch();
  const {  currentUser } =useSelector((state)=> state.users);

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


}, {
title: "Address",
dataIndex: "address" ,
render: (text) => text.toUpperCase()
}, {
    title: "Created At",
    dataIndex: "createdAt",
    render: (text) => getDateFormat(text)
},
{
  title: "Action",
  dataIndex: "action",
  render: (text, record) =>  <span onClick={()=> { setSelectedOrganization(record); setShowHistoryModel(true)}} className="underline text-md cursor-pointer">History</span> 

   
},
]

 
    const getData = async()=>{
try {
    dispatch(SetLoading(true));
    let response = null;
    if(userType === "hospital"){
      response = await GetAllOrganizationsOfAHospital()
    } else{
      response = await GetAllOrganizationsOfADonor()
    }
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
        {
          showHistoryModel && <Modal width={1000} centered open={showHistoryModel} onCancel={()=> setShowHistoryModel(false)} 
          title={ `${  userType === "Donor" ? "Donation History" : "Blood Request History" } in ${selectedOrganization.name}` }>
                  <InventoryTable filters={{ organization: selectedOrganization._id, [userType]:currentUser._id  }} userType="Hospital"/>

        </Modal>
        }
        
        
    </div>
  )
  }

export default Organizations;