import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography, Tabs, Tab, Menu, MenuItem } from '@mui/material';
import { ShoppingCart, AccountCircle } from '@mui/icons-material';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    AyurMart
                </Typography>
                <Tabs value={value} onChange={handleChange} aria-label="menu tabs">
                    <Tab label="Products" sx={{ minWidth: 120 }} />
                    <Tab label="Brands" sx={{ minWidth: 120 }} />
                    <Tab label="Categories" sx={{ minWidth: 120 }} />
                </Tabs>
                <div>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="error">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
