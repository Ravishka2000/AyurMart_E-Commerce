import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import {
    Container,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from "@mui/material";

const CartPage = () => {
    const { user } = useAuthContext();
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = user.token;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(
                    "http://localhost:7002/api/user/cart",
                    config
                );
                setCart(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchCart();
    }, [user]);

    const handleRemove = async (productId) => {
        try {
            const token = user.token;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.put(
                `http://localhost:7002/api/user/cart/${productId}`,
                {},
                config
            );
            if (response) {
                const updatedCart = response.data.updatedCart;
    
                // Calculate the new cart total
                const newCartTotal = calculateCartTotal(updatedCart.products);
    
                // Update the cartTotal field in the state with the new total
                setCart((prevCart) => ({
                    ...prevCart,
                    cartTotal: newCartTotal,
                    products: prevCart.products.filter(
                        (item) => item.product._id !== productId
                    ),
                }));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const calculateCartTotal = (products) => {
        let cartTotal = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotal += products[i].price * products[i].count;
        }
        return cartTotal;
    };    

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Shopping Cart
            </Typography>
            {cart ? (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.products.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        {item.product.title} ({item.product.color})
                                    </TableCell>
                                    <TableCell>{item.count}</TableCell>
                                    <TableCell>{item.product.price}</TableCell>
                                    <TableCell>{item.price * item.count}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemove(item.product._id)}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <Typography variant="subtitle1">Total:</Typography>
                                </TableCell>
                                <TableCell>{cart.cartTotal}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>Loading cart...</Typography>
            )}
        </Container>
    );
};

export default CartPage;
