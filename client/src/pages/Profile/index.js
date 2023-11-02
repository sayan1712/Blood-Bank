import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Inventory from "./Inventory";
import Donors from './Donors'
import Hospitals from './Hospitals'
import Organizations from './Organizations'
import InventoryTable from '../../components/InventoryTable'

//import Hospitals from "./Hospitals";

export default function Profile() {
  const {  currentUser } =useSelector((state)=> state.users);
  return(
          <div>
              <Tabs>
                  { currentUser.userType === "Organization"  && (
                 <>
                 <Tabs.TabPane tab="Inventory" key="1">
                  <Inventory/>
                 </Tabs.TabPane>

                 <Tabs.TabPane tab="Donors" key="2">
                  <Donors/>
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Hospital" key="3">
                   <Hospitals/> 
                  </Tabs.TabPane>
                  </>
                  
           )}

                  { currentUser.userType === "Donor"  && (
                    <>
                 <Tabs.TabPane tab="Donations" key="4">
                    <InventoryTable filters={{inventoryType: "in", donor: currentUser._id}} userType="Donor"/>

                 </Tabs.TabPane>

                 <Tabs.TabPane tab="Organizations" key="5">
            
                 <Organizations userType="Donor"/>
                 </Tabs.TabPane></>
                  
           )}

{ currentUser.userType === "Hospital"  && (
                    <>
                 <Tabs.TabPane tab="Consumptions" key="6">
                  <InventoryTable filters={{inventoryType: "out", hospital: currentUser._id}} userType="Hospital"/>
                 </Tabs.TabPane>

                 <Tabs.TabPane tab="Organizations" key="7">
                 <Organizations userType="hospital"/>
                 </Tabs.TabPane></>
                  
           )}

          
              </Tabs>
        </div>
  );
   }
