import React, { useEffect } from 'react'
import { message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from "react-router-dom"
import { getLoggedInUserName } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentUser } from '../redux/userSlice';



export default function ProtectedPage({ children }) {
    const { currentUser } = useSelector((state) => state.users);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getCurrentUser = async () => {
        try {
            const response = await GetCurrentUser();
            if (response.success) {
                message.success(response.message);
                dispatch(SetCurrentUser(response.data))
            }
            else {
                throw new Error(response.message);
            }

        }
        catch (error) {
            console.log(error.message)
            message.error(error.message);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getCurrentUser();
        } else {
            navigate("/login");
        }
    }, []);

    return (
        currentUser && (
        <div>
            {/* header   */ }

            <div className="flex justify-between items-center bg-primary text-white px-5 py-3">
             <div>
                <h3 className="text-1xl"> BLOODBANK</h3>
              <span className="text-xs">{currentUser.userType.toUpperCase()}</span>
              </div>

           <div className="flex items-center gap-1 ">  
           <i class="ri-shield-user-fill"></i>
                <div className="flex flex-col">
                <span className="mr-5 text-2xs cursor-pointer"> {currentUser.name.toUpperCase()}</span>
                </div>  
                <i className="ri-logout-circle-r-line ml-5 cursor-pointer"
                 onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/login");
                 } }
                ></i>
           </div>
       </div>
                
                {/* body */}

            <div className="p-5">{children}</div>
        </div>
            )

    );

}