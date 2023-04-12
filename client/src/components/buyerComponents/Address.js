import React, { useState } from 'react'
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useAuthContext } from '../../hooks/useAuthContext';
import Typography from '@mui/material/Typography';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Address=()=>{
    const{user} = useAuthContext()
    const[ayurUser,setUser]=useState("")

    useEffect(()=>{
    
        const fetchUser = async()=>{
            const response = await fetch("api/user/"+ user._id,{
                headers :{ 'Authorization' :`Bearer ${user.token}`}
            })
    
            const json = await response.json()
    
            if(response.ok){
                setUser(json)
            }
            
        }
    
        if(user){
            fetchUser()
        }
    
      },[])

      const StyledPaper = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        maxWidth: 400,
        color: theme.palette.text.primary,
        
      }));
    
    

      return(
        <div>

        <Box>
        <Typography sx={{width:800,margin:"auto",padding:"20px"}}
      variant="h4">
        My Address
      </Typography>
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}
      >
      <StyledPaper
                    sx={{
                    my: 1,
                    mx: 'auto',
                    p: 2,
                    
                    }}
                    elevation={0}
                >
             <Grid container wrap="nowrap" spacing={2} 
             alignItems="left">
                <Grid item xs >
                {ayurUser.address==null ? <Typography sx={{ fontSize: "1rem",fontWeight:500 }} textAlign="left">No Address Yet </Typography>:<Typography sx={{ fontSize: "1rem" }} textAlign="left">{ayurUser.address}</Typography>}   
                </Grid>
                </Grid>

     </StyledPaper>
      </Box>
      </Box>
       
           
        </div>
      )



}

export default Address