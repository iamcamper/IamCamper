import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main_Bottom from "../../com/Main_Bottom";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import { Box, Container, Paper, FormControl, Stack, TextField, Button, Link } from '@mui/material';

export default function login(){

    return(
    <div className={styles.container}>

      <Main1_top/>
      <Main1/>
      <Main1_Menu/>

      <div >
        <Container sx={{margin:'auto', textAlign:'center'}}>
            <Box component="span" sx={{margin:'auto', textAlign:'center'}}>
                <h1>I AM CAMPER</h1>
                <Paper elevation={2} sx={{width:'500px' , height:'300px', margin:'auto', padding:'10px'}}>
                    <h2>Member Login</h2>
                    <FormControl>
                        <Stack direction="column" alignItems="center" spacing={1}>
                            <TextField name="id" label="Enter User ID" fullWidth autoFocus></TextField>
                            <TextField name="pw" label="Enter User Password" type="password" fullWidth></TextField>
                            <Button variant="contained" fullWidth>로그인</Button>
                        </Stack>
                    </FormControl>
                    <p>회원 가입</p>
                </Paper>
                <Paper elevation={2} sx={{width:'500px' , height:'200px', margin:'auto', padding:'10px', marginTop:'10px'}}>
                    <h2>간편 소셜 로그인</h2>
                    <div>
                        <Link href={"https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=80dbe36c8a45235bf28e54201f359542&redirect_uri=http://localhost:8080/mem/kakao"}>
                        <img src="../images/kakao_login.png" alt="kakaologin" width="183px" height="45px">
                    </img></Link></div>
                    <div><img src="../images/naver_login.png" alt="naverlogin" width="183px" height="45px"></img></div>
                </Paper>
             </Box>
        </Container>
        
      </div>

      <Main_Bottom/>

    </div>
    );
}