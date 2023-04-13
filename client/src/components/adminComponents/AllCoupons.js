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
import Button from "@mui/material/Button";

const Coupon=()=>{

    const{user} = useAuthContext()
    const[coupons,setCoupons]=useState("")

    const handleDelete=(id)=>{
        
        const deleteCoupon = async()=>{
            const response = await fetch("/api/Coupon/"+id,{
                method:"DELETE"
            })
            const json = await response.json()
            if(response.ok){
                console.log("deleted")
            }
        }
        deleteCoupon()
    }

    useEffect(()=>{
    
        const fetchCoupon = async()=>{
            const response = await fetch("/api/Coupon/")
            const json = await response.json()
    
            if(response.ok){
                setCoupons(json)
            }
            
        }
    
        if(user){
            fetchCoupon()
        }
    
      },[coupons])

      return(
        <div>
        <Box sx={{ overflowX: "hidden", marginTop: "20px"}}
        display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}>
      <Typography sx={{width:650,margin:"auto",padding:"20px"}}
      variant="h4">
        Coupons
      </Typography>
        <TableContainer component={Paper} sx={{margin:"auto",width:650}} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Expire Date</TableCell>
                <TableCell align="right">Discount</TableCell>
                <TableCell align="right">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {coupons && coupons.map((coupon)=>(
                <TableRow
                    key={coupon._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" >
                    {coupon.name}
                    </TableCell>
                    <TableCell component="th" align="right">
                    {new Date(coupon.expiry).toLocaleDateString()}
                    </TableCell>
                    <TableCell component="th" align="right" >
                    {coupon.discount}
                    </TableCell>
                    <TableCell component="th" align="right" >
                    <Button variant="contained" type="submit" onClick={() => handleDelete(coupon._id)} sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '15ch', marginBottom:2, fontWeight:"bold"}}>Delete</Button>
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

export default Coupon