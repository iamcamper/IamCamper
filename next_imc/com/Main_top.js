
import { Stack ,Button,Box} from "@mui/material";
import Grid from '@mui/material/Grid';
import router from "next/router";

export default function Main1_top(){

    return(
        <div style={{width:'1600px', margin:'0 auto',height:'80px'}}> 
            <Grid container my={5} style={{textAlign:'center'}}>
                <Grid item xs={"9"}></Grid>
                <Grid item xs={"3"} container my={5}>
                    <Grid item xs><Button variant="text" style={{width:'100%',height:"100%"}} color="inherit" onClick={()=>router.push("/member/login")} >임시 로그인</Button></Grid>
                    <Grid item xs><Button variant="text" style={{width:'100%',height:"100%"}} color="inherit" >임시 회원가입</Button></Grid>
                </Grid>
            </Grid>
        </div>
    );
}