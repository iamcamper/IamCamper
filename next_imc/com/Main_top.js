
import { Stack ,Button,Box} from "@mui/material";
import Grid from '@mui/material/Grid';
import router from "next/router";
import { hasCookie, deleteCookie } from 'cookies-next';
import { useEffect, useState } from "react";

export default function Main1_top(){

    const [ck,setCk] = useState(true);

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
                        <Button  variant="text" style={{display:"inline-block",widows:"100px"}} color="inherit"
                        onClick={()=>router.push("/member/login")}>임시 로그인</Button>
                        )}
                        {ck && (
                        <Button  variant="text" style={{display:"inline-block",widows:"100px"}} color="inherit"
                        onClick={()=>{
                            deleteCookie('id');
                            setCk(false);
                            router.push("/")
                        }}>Logout</Button>
                        )}

                        {!ck && (
                        <Button  variant="text" style={{display:"inline-block",widows:"100px"}} color="inherit"
                        onClick={()=>router.push("/member/registration")}>임시 회원가입</Button>
                        )}
                        {ck && (
                        <Button  variant="text" style={{display:"inline-block",widows:"100px%"}} color="inherit"
                        onClick={()=>
                            router.push("/camping/test2")
                        }>MyPage</Button>
                        )}
                    </Grid>
            </Grid>

        </div>
    );
}