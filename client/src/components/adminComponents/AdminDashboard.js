import React, { useState } from 'react'
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useAuthContext } from '../../hooks/useAuthContext';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Users from './Users';
import AllOrders from './AllOrders';
import CouponBoard from './CouponBoard';
import UsersChart from './UsersChart';


const AdminDashboard=()=>{

    const{user} = useAuthContext()
    const[users,setUsers]=useState([])

    const [activeLink, setActiveLink] = useState('link1');

    const handleLinkClick = (link) => {
        setActiveLink(link);
      };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    useEffect(()=>{

        const fetchUsers = async()=>{
            const response = await fetch("api/user/get-all"+ user._id,{
                headers :{ 'Authorization' :`Bearer ${user.token}`}
            })
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
              <Box sx={{ overflowX: "hidden", marginTop: "150px",marginBottom:"150px"}}>
              <Box sx={{ width: 1500 ,margin:"auto"}}>
              <Grid  container
              direction="row"
              justifyContent="center"
              alignItems="flex-start" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4}>
                  <Item>
                    <Grid container>
                    <Box
                            sx={{
                            width:500,
                            height: 100,
                            backgroundColor: '#063970'
                          }}
                          
                        />
                        <Grid textAlign={'left'}>
                          <Typography fontWeight="bold">
                          
                          </Typography>
                          <Typography textTransform="capitalize">
                            Admin
                          </Typography>
                        </Grid>
                    </Grid>
                  </Item>
        
                  <Item>
                  <Box sx={{ width: '100%'}}>
                    <List>
                      <ListItemButton
                        onClick={() => handleLinkClick('link1')}
                        className={activeLink === 'link1' ? 'active' : ''}
                        sx={{
                            backgroundColor: activeLink === 'link1' ? '#e0e0e0' : 'transparent', 
                            '&:hover': {
                              backgroundColor: 'e0e0e0',
                            },
                          }}
                       
                      >
                        <ListItemText primary="Orders" />
                      </ListItemButton>
                    </List>
                    <List>
                      <ListItemButton
                        onClick={() => handleLinkClick('link2')}
                        className={activeLink === 'link2' ? 'active' : ''}
                        sx={{
                            backgroundColor: activeLink === 'link2' ? '#e0e0e0' : 'transparent', 
                            '&:hover': {
                              backgroundColor: '#e0e0e0',
                            },
                          }}
                       
                      >
                        <ListItemText primary="Users" 
                          
                        />
                      </ListItemButton>
                    </List>
                    <List>
                      <ListItemButton
                        onClick={() => handleLinkClick('link3')}
                        className={activeLink === 'link3' ? 'active' : ''}
                        sx={{
                            backgroundColor: activeLink === 'link3' ? '#e0e0e0' : 'transparent', 
                            '&:hover': {
                              backgroundColor: '#e0e0e0',
                            },
                          }}
                      >
                        <ListItemText primary="Manage Coupons" />
                      </ListItemButton>
                    </List>
                    <List>
                      <ListItemButton
                        onClick={() => handleLinkClick('link4')}
                        className={activeLink === 'link4' ? 'active' : ''}
                        sx={{
                            backgroundColor: activeLink === 'link4' ? '#e0e0e0' : 'transparent', 
                            '&:hover': {
                              backgroundColor: '#e0e0e0',
                            },
                          }}
                      >
                        <ListItemText primary="Statistic displays" />
                      </ListItemButton>
                    </List>
                  </Box>
                  </Item>
                </Grid>
                <Grid item xs={6} >
                  <Item>
                  {activeLink === 'link1' && <AllOrders />}
                  {activeLink === 'link2' && <Users />}
                  {activeLink === 'link3' && <CouponBoard />}
                  {activeLink === 'link4' && <UsersChart/>}
                  </Item>
                </Grid>
              </Grid>
            </Box>
            </Box>
              
            </div>
    )
  




}

export default AdminDashboard;