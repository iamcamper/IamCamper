
import { Stack ,Button,Box} from "@mui/material";
import Grid from '@mui/material/Grid';
import router from "next/router";

export default function Main1_Menu(){

    return(
        <div style={{width:'1600px', margin:'0 auto',height:'100px'}}> 
            <Grid container my={8} style={{textAlign:'center'}}>
                <Grid item xs><Button variant="contained" style={{width:'100%',height:"100%"}} onClick={()=>router.push("/camping/imc_camping")} >임시 버튼1</Button></Grid>
                <Grid item xs><Button variant="contained" style={{width:'100%',height:"100%"}} >임시 버튼2</Button></Grid>
                <Grid item xs><Button variant="contained" style={{width:'100%',height:"100%"}} >임시 버튼3</Button></Grid>
                <Grid item xs><Button variant="contained" style={{width:'100%',height:"100%"}} >임시 버튼4</Button></Grid>
            </Grid>
        </div>
    );
}