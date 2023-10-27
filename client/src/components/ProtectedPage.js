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
        currentUser && (<div>
            <h1>Welcome {getLoggedInUserName(currentUser.name)}</h1>

            {children}</div>)

    )

}
