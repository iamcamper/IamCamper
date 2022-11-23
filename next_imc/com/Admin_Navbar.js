import styled from "@emotion/styled";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { HomeIcon } from '@mui/icons-material/Home';
import { Home } from "@mui/icons-material";

export default function Admin_Navbar(){

    const StyledToolbar = styled(Toolbar)({
        display:"flex",
        justifyContent:"space-between"
    });
    
    

    return(

        <AppBar position="sticky">
            <StyledToolbar>
                <Typography variant="h6" sx={{display:{xs:"none" , sm:"block"}}}>I AM CAMPER ADMIN</Typography>
                <Home sx={{display:{xs:"block" , sm:"none"}}}/>
            </StyledToolbar>
        </AppBar>

    );

}