export const getLoggedInUserName = (user) =>{
    if(user.userType === "donor"){
        return user.name
    } else if(user.userType ==="hospital"){
        return user.hospitalName
    } else if(user.userType === "organization"){
        return user.organizationName
    }
}

export const getAntdInputValidation = (label) =>{
    return [{
        required: true,
        message:`${label} is required`,
    },
];

};