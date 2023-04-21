import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import {useAuthContext} from "../../hooks/useAuthContext"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Grid from '@mui/material/Grid';
import InboxIcon from '@mui/icons-material/Inbox';
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const UsersChart=()=>{

    const{user} = useAuthContext()
    const[users,setUsers]=useState([])
    const[orders,setOrders]=useState([])

    
    
    useEffect(()=>{

        const fetchUsers = async()=>{
            const response = await fetch("/api/user/all-users")
            const json = await response.json()
            if(response.ok){
                setUsers(json)
            } 
        }

        const fetchOrders = async()=>{
            const response = await fetch("/api/user/allorders")
            const json = await response.json()
            if(response.ok){
                setOrders(json)
            } 
        }

        if(user){
            fetchUsers()
            fetchOrders()
        }
    
      },[users])

    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];

    const userperMonth = Array(12).fill(0);
    const ordersperMonth = Array(12).fill(0);

    for (const user of users) {
          const createdDate = new Date(user.createdAt);
          const month = createdDate.getMonth();
          userperMonth[month]++;
    }

    for (const order of orders) {
        const createdDate = new Date(order.createdAt);
        const month = createdDate.getMonth();
        ordersperMonth[month]++;
  }

    const data1 = {
        labels: months,
        datasets :[{
            label:"Users Per Month",
            data:userperMonth,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor:'rgb(54, 162, 235)',
            borderWidth: 1
        }]
    }

    const data2 = {
        labels: months,
        datasets :[{
            label:"Orders Per Month",
            data:ordersperMonth,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor:'rgb(75, 192, 192)',
            borderWidth: 1
        }]
    }

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
      <Box>
      </Box>
        <Bar data={data1} />
      </Box>

      <Box sx={{ overflowX: "hidden", marginTop: "20px"}}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}>
       <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <InboxIcon color="disabled" fontSize="large"/>
                </Grid>
                <Grid item xs >
                    <Typography sx={{fontSize: "1.2rem" ,
                                    fontWeight: 'bold' }} textAlign="left" variant="h3">Total Orders</Typography>
                    <Typography sx={{ fontSize: "1rem" }} textAlign="left">{orders.length}</Typography>
                </Grid>
                </Grid>
      <Typography sx={{width:650,margin:"auto",padding:"20px"}}
      variant="h4">
        Orders
      </Typography>
      <Box>
      </Box>
        <Bar data={data2} />
      </Box>
      </div>


      )
}

export default UsersChart