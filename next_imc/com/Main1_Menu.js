
import { Stack ,Button,Box} from "@mui/material";
import Grid from '@mui/material/Grid';
import router from "next/router";

export default function Main1_Menu(){

    return(
        <div style={{width:'1600px', margin:'0 auto',height:'100px'}}> 
            <Grid container my={8} style={{textAlign:'center'}}>
                <Grid item xs><Button variant="contained" style={{width:'100%',height:"100%"}} onClick={()=>router.push("/camping/imc_camping")} >GO CAMPING</Button></Grid>
                <Grid item xs><Button variant="contained" style={{width:'100%',height:"100%"}} >자유게시판</Button></Grid>
                <Grid item xs><Button variant="contained" style={{width:'100%',height:"100%"}} >중고거래</Button></Grid>
                <Grid item xs><Button variant="contained" style={{width:'100%',height:"100%"}} >자주 찾는 질문</Button></Grid>
            </Grid>
        </div>
    );
}