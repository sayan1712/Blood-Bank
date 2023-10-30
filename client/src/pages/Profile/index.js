import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Inventory from "./Inventory";


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
                  {/* <Donors/> */}
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Hospital" key="3">
                  {/* <Donors/> */}
                  </Tabs.TabPane>
                  </>
                  
           )}
          {/* {currentUser.userType === "donar" &&  (
          <>
          <Tabs.TabPane tab="Donations" key="1">
                 </Tabs.TabPane>
          <Tabs.TabPane tab="Organizations" key="2">
              <organizations/>
                 </Tabs.TabPane>     
          </>
          )} */}
              </Tabs>
        </div>
  );
   }
