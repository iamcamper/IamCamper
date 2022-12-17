import styled from "@emotion/styled";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { HomeIcon } from '@mui/icons-material/Home';
import { Home, Menu } from "@mui/icons-material";
import { withStyles } from "@mui/material";
import { Drawer } from "@mui/material";
import Admin_Sidebar from "./Admin_Sidebar";


export default function Admin_Navbar(){

    const StyledToolbar = styled(Toolbar)({
        display:"flex",
        justifyContent:"space-between"
    });
    
    

    return(
        <div>
            <AppBar position="sticky">
                <StyledToolbar>
                   
                    <Typography variant="h6" sx={{display:{xs:"none" , sm:"block"}}}>I AM CAMPER ADMIN</Typography>
                    <Home sx={{display:{xs:"block" , sm:"none"}}}/>
                </StyledToolbar>
            </AppBar>
        </div>
    );

}