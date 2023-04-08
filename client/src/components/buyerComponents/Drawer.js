import React, { useState } from "react";
import {
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SpaIcon from '@mui/icons-material/Spa';

const pages = ["Home", "Categories", "ABoutUs", "ContactUs"];
const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <SpaIcon sx={{ transform: "scale(2)", marginLeft: "40%", marginY: "40px" }} />
                <Typography sx={{
                        fontSize: "2rem",
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        marginLeft: "30px",
                        marginBottom: "20px"
                        }}>
                            AYURMART
                </Typography>
                <List>
                    {pages.map((page, index) => (
                        <ListItemButton key={index} sx={{ paddingLeft: "20px", paddingRight: "100px"}}>
                            <ListItemIcon>
                                <ListItemText>{page}</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    ))}
                </List>
                <List sx={{ marginTop: "auto" }}>
                <ListItemButton sx={{ paddingLeft: "20px", paddingRight: "100px" }}>
                            <ListItemIcon>
                                <ListItemText>Cart</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton sx={{ paddingLeft: "20px", paddingRight: "80px"}}>
                            <ListItemIcon>
                                <ListItemText>Profile</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                </List>
            </Drawer>
            <IconButton
                sx={{ color: "white", marginLeft: "30px", transform: "scale(2)" }}
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                <MenuIcon color="white" />
            </IconButton>
        </>
    );
};

export default DrawerComp;