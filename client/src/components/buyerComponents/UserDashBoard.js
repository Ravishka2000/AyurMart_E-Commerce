import React, { useState } from 'react'
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useAuthContext } from '../../hooks/useAuthContext';
import Typography from '@mui/material/Typography';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Button from '@mui/material/Button';
import EditUser from './EditUser';
import UserInfo from './UserInfo';
import Address from './Address';
import EditAddress from './EditAddress';


const UserDashBoard=()=>{

 

    const [isEditing, setIsEditing] = useState(false);

    const[isaddressEditing,setAddressEditing]=useState(false)

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleAddressToggle=()=>{
      setAddressEditing(!isaddressEditing);
    }


    

    

    return(
        <div>
        {isEditing ? (
        <EditUser onEditToggle={handleEditToggle} /> 
      ) : (
        <UserInfo />
      )}
      {!isEditing && (
        <Button onClick={handleEditToggle} variant="contained" 
            sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '45ch', padding: 2, margin: 2, fontWeight:"bold"}}>
          Edit
        </Button>
      )}

      {isaddressEditing ? (
        <EditAddress onEditToggleAddress={handleAddressToggle} /> 
      ) : (
        <Address />
      )}

      {!isaddressEditing && (
        <Button onClick={handleAddressToggle} variant="contained" 
            sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '45ch', padding: 2, margin: 2, fontWeight:"bold"}}>
          Add Address
        </Button>
      )}

      
        </div>

    

        
        
    )

}

export default UserDashBoard