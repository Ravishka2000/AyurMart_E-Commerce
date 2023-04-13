import React, { useState } from 'react'
import { useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, Grid } from '@mui/material'; 
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from "@mui/material/Button";
import axios from 'axios';
import Alert from "@mui/material/Alert"

const EditAddress=({onEditToggleAddress})=>{

    const{user} = useAuthContext()
    const[ayurUser,setUser]=useState("")
    const[address,setAddress]=useState("")
    const[error,setError]=useState("")

    useEffect(()=>{

        const fetchUser = async() =>{
            const response = await fetch(`/api/user/${user._id}`,
                {headers:{
                    'Authorization' :`Bearer ${user.token}`
            }})

            const json = await response.json()
            
            if(response.ok){
                setUser(json)
                setAddress(json.address)
            }
        }
        fetchUser()
        
    },[user])

    const handleSubmit= async(e)=>{
        e.preventDefault()
        const data ={
            address
        }
        axios.put('api/user/save-address',data,{
            headers:{'Authorization' :`Bearer ${user.token}`}
        })
        .then(response=>{
            if(response.status === 200){
                const json = response.data
                onEditToggleAddress()
                
            }else{
                setError(response.message)
            }
            
        }).catch(error=>{
            setError(error.response.data.message);
        })
        

    }

    return(
        

            <div>
    
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    flexDirection: { xs: "column", sm: "row" }
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Grid 
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                justify="space-around" 
                placeItems='center'>
                <div>
                <Grid item xs={12}
                style={{ padding:"2"}}
                >
                    <Box 
                    textAlign="center">
                    <h1>
                    Edit Details
                    </h1>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="standard"
                    value={address}
                    focused
                    onChange={(e)=>setAddress(e.target.value)}
                    style={{ width: '35ch' }}
                />
                </Grid>
                </div>
                <Button variant="contained" type="submit"
            sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '45ch', padding: 2, margin: 2, fontWeight:"bold"}}
            >Add Address</Button>
                </Grid>
                </Box>
                </div>
    )

    




}

export default EditAddress