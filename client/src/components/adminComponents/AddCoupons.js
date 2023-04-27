import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material'; 
import Button from "@mui/material/Button";
import axios from 'axios';
import Alert from "@mui/material/Alert"


const AddCoupons=({onAddingToggle})=>{


    const{user} = useAuthContext()
    const[name,setname]=useState("")
    const[expiry,setexpiry]=useState("")
    const[discount,setdiscount]=useState("")
    const[error,setError]=useState("")

    const handleSubmit= async(e)=>{
        e.preventDefault()
        const data ={
            name,
            expiry,
            discount
        }
        axios.post('http://localhost:7003/api/Coupon/',data)
        .then(response=>{
            if(response.status === 200){
                const json = response.data
                onAddingToggle()
            }else{
                setError(response.message)
            }
            
        }).catch(error=>{
            setError(error.response.data.message);
        })
        

    }

    const handleCancelClick = () => {
        onAddingToggle();
      };
    
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
            Add Coupon
            </h1>
            </Box>
        </Grid>
       
    <Grid item xs={12}>
    <TextField
     
            label="Name"
            variant="standard"
            focused
            onChange={(e) => setname(e.target.value)}
            value={name}
            style={{ width: '35ch' }}
    />
    </Grid>
    <Grid item xs={12}>
    <TextField
        label="Expiry"
        type="date" 
        InputLabelProps={{
          shrink: true, 
        }}
        InputProps={{
          inputProps: {
            max: '2030-12-31', 
          },
        }}
        onChange={(e) => setexpiry(e.target.value)}
        value={expiry}
        style={{ width: '35ch' }}
    />
    </Grid>
    <Grid item xs={12}>
    <TextField
            label="Discount"
            variant="standard"
            focused
            onChange={(e) => setdiscount(e.target.value)}
            value={discount}
            style={{ width: '35ch' }}
    />
    </Grid>
    </div>
    <Grid item xs={20}
        style={{ padding:"10"}}>
        <Button variant="contained" type="submit"
        sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '45ch', padding: 2, margin: 2, fontWeight:"bold"}}
        >Add Coupon</Button>
       

    </Grid>
    <Button variant="contained" onClick={handleCancelClick}
        sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '45ch', padding: 2, margin: 2, fontWeight:"bold"}}
        >Back</Button>   
    </Grid>
    
    {error && <Alert variant="filled" severity="error" style={{fontWeight:"bold",color: "#063970"}}>{error}</Alert>}
    
    
    </Box>
    
    </div>

    )
   

}

export default AddCoupons;