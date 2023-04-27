import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box"
import { Typography } from "@mui/material";
import axios from 'axios';
import InboxIcon from '@mui/icons-material/Inbox';
import Grid from '@mui/material/Grid';
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

const AllOrders = () => {

    const { user } = useAuthContext()
    const [orders, setOrders] = useState([])

    const approveOrder = (id, newStatus) => {
        axios.put('http://localhost:7006/api/order/update-order/' + id, { status: newStatus })
            .then(response => {
                if (response.status === 200) {
                    const updatedOrders = orders.map(order => {
                        if (order._id === id) {
                            return { ...order, orderStatus: newStatus };
                        }
                        return order;
                    });
                    setOrders(updatedOrders);
                }

            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch("http://localhost:7006/api/order/allorders")
            const json = await response.json()
            if (response.ok) {
                setOrders(json)
            }
        }
        if (user) {
            fetchOrders()
        }
    }, [orders])

    return (
        <div>
            <Box sx={{ overflowX: "hidden", marginTop: "20px" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection={"column"}>
                <Grid container wrap="nowrap" spacing={2} alignContent="left">
                    <Grid item>
                        <InboxIcon color="disabled" fontSize="large"></InboxIcon>
                    </Grid>
                    <Grid item xs>
                        <Typography sx={{
                            fontSize: "1.2rem",
                            fontWeight: 'bold'
                        }} textAlign="left">Orders</Typography>
                        <Typography sx={{ fontSize: "1rem" }} textAlign="left">{orders.length}</Typography>
                    </Grid>
                </Grid>
                <Typography sx={{ width: 650, margin: "auto", padding: "20px" }}
                    variant="h4">
                    Orders
                </Typography>
                <TableContainer component={Paper} sx={{ margin: "auto", width: 650 }} elevation={0}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders && orders.map((order) => (
                                <TableRow
                                    key={order._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" >
                                        {order._id.slice(0, 10)}
                                    </TableCell>
                                    <TableCell component="th" align="right">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell component="th" align="right" >
                                        <FormControl>
                                            <Select
                                                value={order.orderStatus}
                                                onChange={(e) => {

                                                    approveOrder(order._id, e.target.value);
                                                }}
                                            >
                                                <MenuItem value="Pending">Pending</MenuItem>
                                                <MenuItem value="Confirm">Confirm</MenuItem>
                                                <MenuItem value="Dispatched">Dispatched</MenuItem>
                                                <MenuItem value="Delivered">Delivered</MenuItem>
                                            </Select>
                                        </FormControl>
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

export default AllOrders