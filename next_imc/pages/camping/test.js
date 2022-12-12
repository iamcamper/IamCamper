import { Button } from "@mui/material";
import Axios from "axios";
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import router from "next/router";
import { setCookie } from "cookies-next";

export default function test(){
    const API_URL = "/cam/update";
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(value);
      };
    function Update(e){
        var a = e.target.value;
        console.log(a);
        Axios.get(
            API_URL+a,
        ).then((json)=>{
            console.log(json);
        }).catch((Error)=>{
            console.log(Error);
            alert("병원,약국 업데이트 시 20분~30분!!");
        });

    }

      return(
      
      <div>
        <Button onClick={Update} value="1">캠핑</Button>
        <Button onClick={Update} value="2">병원</Button>
        <Button onClick={Update} value="3">약국</Button>
        <Button  variant="text" style={{width:'100%',height:"100%"}} color="inherit"
                        onClick={()=>{
                          setCookie('u_name', "1", {maxAge: 60*60});
                          router.push("/");
                        }}>로그인</Button>
     
     
    <BottomNavigation style={{ width: "500px",margin:"0 auto" }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="전체보기"
        value="전체보기"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="병원"
        value="병원"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Nearby"
        value="캠핑"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction 
        label="애완동물" 
        value="애완동물" 
        icon={<FolderIcon />} />
    </BottomNavigation>
    <BottomNavigation style={{ width: "500px",margin:"0 auto" }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="1"
        value="1"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="2"
        value="2"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="3"
        value="3"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction 
        label="4" 
        value="4" 
        icon={<FolderIcon />} />
    </BottomNavigation>  


      </div>
      );
  }