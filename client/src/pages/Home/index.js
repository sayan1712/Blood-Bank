import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { SetLoading }  from  "../../redux/loadersSlice" ;
import { message }   from "antd" ;
import { GetAllBloodGroupsInventory } from '../../apicalls/dashboard'
import InventoryTable from '../../components/InventoryTable'

const colors =[

        "#CE5959" , "#1A5F7A" , "#88621B" , "#245953" , "#2C3333" , "#4E6E81" , "#A84448" , "#635985"
    ];


export default function Home() {
  const {currentUser} = useSelector((state)=>state.users);
  const  [bloodGroupsData = [], setBloodGroupsData ] =useState([]);
const dispatch =useDispatch();

const getData =async () => {

   try {
        dispatch(SetLoading(true));
        const response = await  GetAllBloodGroupsInventory();
        dispatch(SetLoading(false));
        if (response.success){
            setBloodGroupsData(response.data);
            console.log(bloodGroupsData)
        } else {
            throw new Error (response.message);
        }
   }  catch (error){

         message.error (error.message);
        dispatch(SetLoading(false));
   }
};


useEffect(() => {
      getData();
       
} , []);

  return (
    <div>
          {
            currentUser.userType === "Organization" && <>
            <div className="grid grid-cols-4 gap-5 my-5">
            {bloodGroupsData.map((bloodGroup,index) => {
             const color=colors[index];
                  return (<div
                  className={`p-5 flex justify-between text-white rounded items-center`}  
                  style ={{ background:color }}
                >

                          <h1
                           className="text-5xl uppercase"
                          >
                             {bloodGroup.bloodGroup }

                          </h1>
            
            
            
                   <div className="flex flex-col justify-between gap-2">
                       <div className="flex justify-between gap-5">
                        <span>Total In</span>
                        <span>{bloodGroup.totalIn}ML</span>
                      </div>

                      <div className="flex justify-between gap-5">
                        <span>Total Out</span>
                        <span>{bloodGroup.totalOut}ML</span>
                      </div> 

                      <div className="flex justify-between gap-5">
                        <span>Available</span>
                        <span>{bloodGroup.available}ML</span>
                      </div>

                 </div> 
            </div>
                  );
            })}                               
          }
        </div>
        <span className="text-xl text-gray-700 "> Your Recent Donations
        </span>
        <InventoryTable 
        filters = {{ organization: currentUser._id }}
        limit={5}
        userType={currentUser.userType}
        /></>
          }
          
          {
            currentUser.userType === "Donor" && <>
        <h1 className="text-xl text-gray-700 "> Your Recent Inventory
        </h1>
        <InventoryTable 
        filters = {{ donor: currentUser._id }}
        limit={5}
        userType={currentUser.userType}
        /></>
          }

          {
            currentUser.userType === "Hospital" && <>
        <h1 className="text-xl text-gray-700 "> Your Recent Requests/Consumptions
        </h1>
        <InventoryTable 
        filters = {{ hospital: currentUser._id }}
        limit={5}
        userType={currentUser.userType}
        /></>
          }
          
     </div>
  )
}  