
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
        <div className="maint"> 
            <Grid container>
                <Grid item xs={9}></Grid>
                <Grid item xs={3}>


                        {!ck && (
                        <Button className="maint2" variant="text"  color="inherit"
                        onClick={()=>router.push("/member/login")}>LOGIN</Button>
                        )}
                        {ck && (
                        <Button className="maint2" variant="text" color="inherit"
                        onClick={()=>{
                            deleteCookie("m_idx");
                            deleteCookie("id");
                            deleteCookie("nickname");
                            setCk(false);
                            router.push("/")
                        }}>Logout</Button>
                        )}

                        {!ck && (
                        <Button className="maint2" variant="text"  color="inherit"
                        onClick={()=>router.push("/member/registration")}>회원가입</Button>
                        )}
                        {ck && (
                        <Button className="maint2" variant="text"color="inherit"
                        onClick={()=>
                            router.push("/member/information ")
                        }>MyPage</Button>
                        )}
                    </Grid>
            </Grid>

        </div>
    );
}