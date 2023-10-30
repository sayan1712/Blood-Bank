import React from 'react'
import InventoryForm from './InventoryForm';
import { Button } from 'antd';
export default function Inventory() {
    const [open, setOpen] = React.useState(false);
  return (
    <div>
        <div className='flex justify-end'>
            <Button type="default" onClick ={()=> setOpen(true)}>Add Inventory</Button>
        </div>


        {open && <InventoryForm open={open} setOpen={setOpen}/>}
      
    </div>
  )
}
