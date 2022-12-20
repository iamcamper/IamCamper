import { Announcement, Campaign, Description, Event, Home, Logout, Person, Upgrade } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Axios from "axios";

export default function Admin_Sidebar(){

    const API_URL = "/cam/update1";

    function Update(){
        alert("업데이트 완료까지 약 5분 입니다.");

        Axios.get(
            API_URL,
        ).then((json)=>{
            console.log(json);
        }).catch((Error)=>{});
    }

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
                    <ListItemButton component="a" href="/admin/bbs">
                        <ListItemIcon>
                            <Description/>
                        </ListItemIcon>
                        <ListItemText primary="게시글 관리"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/admin/approve">
                        <ListItemIcon>
                            <Person/>
                        </ListItemIcon>
                        <ListItemText primary="관리자 승인"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#">
                        <ListItemIcon>
                            <Upgrade/>
                        </ListItemIcon>
                        <ListItemText primary="Data Update"   onClick={Update}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/admin/logout">
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