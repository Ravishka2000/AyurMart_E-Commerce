import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { AppBar, Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SpaIcon from '@mui/icons-material/Spa';
import DrawerComp from "./Drawer";

const Header = () => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));


    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar sx={{ background: "#063970", padding: "15px" }}>
                <Toolbar>
                    <SpaIcon sx={{ transform: "scale(2)" }} />
                    <Typography sx={{
                        fontSize: "2rem",
                        paddingLeft: "2%",
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                        AYURMART
                    </Typography>
                    {isMatch ? (
                        <>

                            <Tooltip title="Open Cart">
                                <Link to="/cart" style={{ marginLeft: "auto",textDecoration:"none", color:"white"}}>
                                    <ShoppingCartIcon sx={{ transform: "scale(1.5)" }} />
                                </Link>
                            </Tooltip>
                            <Box sx={{ flexGrow: 0, marginLeft: "40px" }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <DrawerComp />
                        </>
                    ) : (
                        <>
                            <Tabs
                                sx={{ marginLeft: "auto", fontFamily: 'monospace', fontSize: "24px" }}
                                indicatorColor="secondary"
                                textColor="inherit"
                                value={value}
                                onChange={(e, value) => setValue(value)}
                            >
                                <Tab label="Home" />
                                <Tab label="Category" />
                                <Tab label="About Us" />
                                <Tab label="Contact" />
                            </Tabs>

                            <Tooltip title="Open Cart">
                                <Link to="/cart" style={{marginLeft: "auto",textDecoration:"none", color:"white"}}>
                                    <ShoppingCartIcon sx={{ transform: "scale(1.5)" }} />
                                </Link>
                            </Tooltip>
                            <Box sx={{ flexGrow: 0, marginLeft: "40px" }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;