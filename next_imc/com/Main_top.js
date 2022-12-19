
import { Stack ,Button,Box} from "@mui/material";
import Grid from '@mui/material/Grid';
import router from "next/router";
import { hasCookie, deleteCookie, getCookie } from 'cookies-next';
import { useEffect, useState } from "react";

export default function Main1_top(){

    const [ck,setCk] = useState(false);

    useEffect(() => { 
        if(hasCookie("id")){
            setCk(true);
        }else{
            setCk(false);
        }
    },[]);

    return(
        <div style={{width:'1600px', margin:'0 auto',height:'80px'}}> 
            <Grid container>
                <Grid item xs={9}></Grid>
                <Grid item xs={3}>


                        {!ck && (
                        <Button  variant="text" style={{display:"inline-block",width:"50%"}} color="inherit"
                        onClick={()=>router.push("/member/login")}>LOGIN</Button>
                        )}
                        {ck && (
                        <Button  variant="text" style={{display:"inline-block",width:"50%"}} color="inherit"
                        onClick={()=>{
                            deleteCookie("m_idx");
                            deleteCookie("id");
                            deleteCookie("nickname");
                            setCk(false);
                            router.push("/")
                        }}>Logout</Button>
                        )}

                        {!ck && (
                        <Button  variant="text" style={{display:"inline-block",width:"50%"}} color="inherit"
                        onClick={()=>router.push("/member/registration")}>회원가입</Button>
                        )}
                        {ck && (
                        <Button  variant="text" style={{display:"inline-block",width:"50%"  }} color="inherit"
                        onClick={()=>
                            router.push("/member/information ")
                        }>MyPage</Button>
                        )}
                    </Grid>
            </Grid>

        </div>
    );
}