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
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Grid from '@mui/material/Grid';

const Users=()=>{

    const{user} = useAuthContext()
    const[users,setUsers]=useState([])

    const handleDelete=(id)=>{
        
        const deleteUsers = async()=>{
            const response = await fetch("/api/user/"+id,{
                method:"DELETE"
            })
            const json = await response.json()
            if(response.ok){
                console.log("deleted")
            }
        }
        deleteUsers()
    }

    const blockUser=(id)=>{
        const handleBlock = async()=>{
            const response = await fetch("/api/user/block-user/"+id,{
                method:"PUT"
            })
            const json = await response.json()
            if(response.ok){
                console.log("hello")
                console.log(json)
            }   
        }
        handleBlock()
        
    }

    const unblockUser=(id)=>{
        const response = fetch("/api/user/unblock-user/"+id,{
            method:"PUT"
        })
        if(response.ok){
            const json = response.json()
        }
        
    }

    useEffect(()=>{

        const fetchUsers = async()=>{
            const response = await fetch("/api/user/all-users")
            const json = await response.json()
            if(response.ok){
                setUsers(json)
            } 
        }
        if(user){
            fetchUsers()
        }
    
      },[users])
    

      return(
        <div>
        <Box sx={{ overflowX: "hidden", marginTop: "20px"}}
        display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}>
       <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <PersonOutlineOutlinedIcon color="disabled" fontSize="large"/>
                </Grid>
                <Grid item xs >
                    <Typography sx={{fontSize: "1.2rem" ,
                                    fontWeight: 'bold' }} textAlign="left" variant="h3">Total Users</Typography>
                    <Typography sx={{ fontSize: "1rem" }} textAlign="left">{users.length}</Typography>
                </Grid>
                </Grid>
      <Typography sx={{width:650,margin:"auto",padding:"20px"}}
      variant="h4">
        Users
      </Typography>
        <TableContainer component={Paper} sx={{margin:"auto",width:650}} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="right">Full name</TableCell>
                <TableCell align="right">Mobile</TableCell>
                <TableCell align="right">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {users && users.map((u)=>(
                <TableRow
                    key={u._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" >
                    {u.email}
                    </TableCell>
                    <TableCell component="th" align="right">
                    {u.firstName} {u.lastName}
                    </TableCell>
                    <TableCell component="th" align="right" >
                    {u.mobile}
                    </TableCell>
                    <TableCell component="th" align="right" >
                    <Button variant="contained" type="submit" onClick={() => handleDelete(u._id)} sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '15ch', marginBottom:2, fontWeight:"bold"}}>Delete</Button>
                    <Button variant="contained" type="submit" onClick={() =>{u.isBlocked ? unblockUser(u._id):blockUser(u._id)}} sx={{ color: 'white', backgroundColor: "#063970", borderColor: 'green', width: '15ch', fontWeight:"bold"}}>
                    {u.isBlocked ? "Unblock":"Block"}
                    </Button>
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

export default Users