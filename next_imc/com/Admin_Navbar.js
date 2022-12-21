import styled from "@emotion/styled";
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { HomeIcon } from '@mui/icons-material/Home';
import { Home, Menu } from "@mui/icons-material";
import { withStyles } from "@mui/material";
import { Drawer } from "@mui/material";
import Admin_Sidebar from "./Admin_Sidebar";
import { getCookie, hasCookie } from "cookies-next";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";


export default function Admin_Navbar(){

    const StyledToolbar = styled(Toolbar)({
        display:"flex",
        justifyContent:"space-between"
    });

    const [nickname, setNickname] = useState('');

    useEffect(()=>{
        if(hasCookie("adminnickname")){
            setNickname(getCookie("adminnickname"));
        }else{

        }
    },[]);

    
    
    return(
        <div>
            <AppBar position="sticky">
                <StyledToolbar>
                    <Typography variant="h6" sx={{display:{xs:"none" , sm:"block"}}}>I AM CAMPER ADMIN</Typography>
                    <Home sx={{display:{xs:"block" , sm:"none"}}}/>
                    <Stack direction='row' spacing={2}>
                        <Box sx={{paddingTop:'10px'}}>
                            {nickname}님 환영합니다!
                        </Box>
                    </Stack>
                </StyledToolbar>
            </AppBar>
        </div>
    );

}