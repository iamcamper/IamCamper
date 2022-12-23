
import { Stack ,Button,Box} from "@mui/material";
import Grid from '@mui/material/Grid';
import router from "next/router";

export default function Main1_Menu(){

    return(
        <div className="mainm"> 
            <Grid container my={8} style={{textAlign:'center'}}>
                <Grid item xs><Button className="mainm2" variant="contained"  onClick={()=>router.push("/camping/imc_camping")} >GO CAMPING</Button></Grid>
                <Grid item xs><Button className="mainm2" variant="contained"  onClick={()=>router.push("/bbs/free_bbs")}>자유게시판</Button></Grid>
                <Grid item xs><Button className="mainm2" variant="contained"  onClick={()=>router.push("/bbs/buy_bbs")}>중고거래</Button></Grid>
                <Grid item xs><Button className="mainm2" variant="contained" onClick={() => router.push("/bbs/QNA")}>자주 찾는 질문</Button></Grid>
            </Grid>
        </div>
    );
}