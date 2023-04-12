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
import Address from './Address';

const UserInfo=()=>{

    
    const{user} = useAuthContext()
    const[ayurUser,setUser]=useState("")

    

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    
      
      const Bold = styled(Typography)(({theme})=>({
        textAlign: 'center',
        fontWeight:"bold",
        color:"black"
        
      }))
    
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
    

      },[user])

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
        My Profile
      </Typography>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            <StyledPaper
                    sx={{
                    my: 1,
                    mx: 'auto',
                    p: 2,
                    
                    }}
                    elevation={0}
                >
                <Grid container wrap="nowrap" spacing={2} >
                <Grid item>
                    <PersonOutlineOutlinedIcon color="disabled" fontSize="large"/>
                </Grid>
                <Grid item xs >
                    <Typography sx={{fontSize: "1.2rem" ,
                                    fontWeight: 'bold' }} textAlign="left">Full name</Typography>
                    <Typography sx={{ fontSize: "1rem" }} textAlign="left">{ayurUser.firstName} {ayurUser.lastName}</Typography>
                </Grid>
                </Grid>
            </StyledPaper>
            <StyledPaper
                    sx={{
                    my: 1,
                    mx: 'auto',
                    p: 2,
                    
                    }}
                    elevation={0}
                >
                <Grid container wrap="nowrap" spacing={2} alignContent="left">
                <Grid item>
                    <EmailOutlinedIcon color="disabled" fontSize="large"></EmailOutlinedIcon>
                </Grid>
                <Grid item xs>
                    <Typography sx={{ fontSize: "1.2rem",
                                    fontWeight: 'bold' }} textAlign="left">Email</Typography>
                    <Typography sx={{ fontSize: "1rem"  }} textAlign="left">{ayurUser.email}</Typography>
                </Grid>
                </Grid>
            </StyledPaper>
            <StyledPaper
                    sx={{
                    my: 1,
                    mx: 'auto',
                    p: 2,
                    
                    }}
                    elevation={0}
                >
                <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <SmartphoneIcon color="disabled" fontSize="large"/>
                </Grid>
                <Grid item xs>
                    <Typography sx={{ fontSize: "1.2rem",
                                      fontWeight: 'bold'  }} textAlign="left">Mobile</Typography>
                    <Typography sx={{ fontSize: "1rem" }} textAlign="left">{ayurUser.mobile}</Typography>
                </Grid>
                </Grid>
            </StyledPaper>
            </Box>
        </Box>

        

        
           
        </div>

      )


}

export default UserInfo;