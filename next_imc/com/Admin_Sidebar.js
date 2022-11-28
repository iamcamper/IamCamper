import { Announcement, Campaign, Description, Event, Home, Logout, Person } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export default function Admin_Sidebar(){

    return(
        <Box flex={1} p={2} xs={4} sx={{display:{xs:'none', sm:'block'}}}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/admin/main">
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary="메인"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/admin/notice">
                        <ListItemIcon>
                            <Campaign/>
                        </ListItemIcon>
                        <ListItemText primary="공지사항"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/admin/banner">
                        <ListItemIcon>
                            <Event/>
                        </ListItemIcon>
                        <ListItemText primary="광고(배너)관리"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#bbs">
                        <ListItemIcon>
                            <Description/>
                        </ListItemIcon>
                        <ListItemText primary="게시글 관리"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#member">
                        <ListItemIcon>
                            <Person/>
                        </ListItemIcon>
                        <ListItemText primary="회원 관리"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#logout">
                        <ListItemIcon>
                            <Logout/>
                        </ListItemIcon>
                        <ListItemText primary="로그아웃"/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

}