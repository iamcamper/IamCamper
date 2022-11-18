
import { Stack ,Button,Box} from "@mui/material";
import Grid from '@mui/material/Grid';

export default function Main1_Menu(){

    return(
        <Box style={{width:'1600px', margin:'auto'}}> 
            <Grid container my={5} style={{textAlign:'center'}}>
                <Grid item xs><Button variant="text" style={{width:'100%'}} color='inherit'>New Releases</Button></Grid>
                <Grid item xs><Button variant="text" style={{width:'100%'}} color='inherit'>Mem</Button></Grid>
                <Grid item xs><Button variant="text" style={{width:'100%'}} color='inherit'>Women</Button></Grid>
                <Grid item xs><Button variant="text" style={{width:'100%'}} color='inherit'>Kids</Button></Grid>
                <Grid item xs><Button variant="text" style={{width:'100%'}} color='inherit'>Sale</Button></Grid>
                <Grid item xs><Button variant="text" style={{width:'100%'}} color='inherit'>SNKRS</Button></Grid>
            </Grid>
        </Box>
    );
}