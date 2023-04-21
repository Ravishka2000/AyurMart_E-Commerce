import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import {useAuthContext} from "../../hooks/useAuthContext"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box"
import { Typography } from "@mui/material";

const Orders=()=>{

    const{user} = useAuthContext()
    const[orders,setorders]=useState([])

   
    
    useEffect(()=>{

        const fetchOrder = async() =>{
            console.log(user.token)
            const response = await fetch(`/api/user/get-orders`,
                {headers:{
                    'Authorization' :`Bearer ${user.token}`
            }})

            const json = await response.json()
            
            if(response.ok){
                setorders(json) 
            }
        }
        fetchOrder()
        console.log(orders)
        
    },[user])

    return(
        <div>
        <Box sx={{ overflowX: "hidden", marginTop: "20px"}}
        display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}>
      <Typography sx={{width:800,margin:"auto",padding:"20px"}}
      variant="h4">
        My Orders
      </Typography>
        <TableContainer component={Paper} sx={{margin:"auto",width:650}} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {orders && orders.map((order)=>(
                <TableRow
                    key={order._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" >
                    {order._id.slice(0, 10)}
                    </TableCell>
                    <TableCell component="th" align="right">
                    {order.paymentIntent.amount}
                    </TableCell>
                    <TableCell component="th" align="right" >
                    {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell component="th" align="right">
                    {order.orderStatus}
                    </TableCell>
                </TableRow>  
            ))}
 
            </TableBody>
            </Table>
        </TableContainer>
       
        </Box>
        </div>
    )

}

export default Orders;
