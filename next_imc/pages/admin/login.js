import { Box, Container, Paper, FormControl, Stack, TextField, Button, Link, Card, CardContent, Typography, CardMedia } from '@mui/material';
import Main_Bottom from '../../com/Main_Bottom';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { useState } from 'react';
import Admin_Footer from '../../com/Admin_Footer';
import { setCookie } from 'cookies-next';


export default function login () {

    const router = useRouter();
    
    const [admin, setAdmin] = useState({
        id : '',
        pw: '',
    });
    
    const LOGIN_URL = "/admin/login/chk";
    
    function changeAdmin(e){
    
        setAdmin({
            ...admin,
            [e.target.name] : e.target.value
        })
    }

    function LoginChk(){
        Axios.post(
            LOGIN_URL, null,
            {params:{id: admin.id, pw: admin.pw, grade: 9}}
        ).then(json =>{
            if(json.data.chk===0)
                router.push("/admin/login");
            else{
                setCookie('adminid', json.data.admin.id, {maxAge: 60*60*24});
                setCookie('adminnickname', json.data.admin.nickname, {maxAge: 60*60*24});
                router.push("/admin/main");
            }
        })
    }

    return(
        <div>
        <Container sx={{margin:'auto', textAlign:'center', marginBottom: '200px'}}>
            <Box component="div" sx={{margin:'auto', textAlign:'center', marginTop: '100px'}}>
                <h1 sx={{}}>I AM CAMPER admin</h1>
            </Box>

            <Card sx={{ display: 'flex', width:'800px', margin:'auto', textAlign:'center'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width:'400px'}}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        admin login
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        관리자 페이지입니다.
                    </Typography>
                    </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, textAlign: 'center', margin:'auto', paddingBottom:'20px'}}>
            <FormControl>
                <Stack direction="column" alignItems="center" spacing={1} sx={{textAlign:'center', margin:'auto'}}>
                    <TextField name="id" label="Enter User ID" fullWidth autoFocus onChange={changeAdmin}></TextField>
                    <TextField name="pw" label="Enter User Password" type="password" fullWidth onChange={changeAdmin}></TextField>
                    <Button variant="contained" fullWidth onClick={LoginChk}>로그인</Button>
                </Stack>
                <Link href='/admin/reg'>
                    <p>회원 가입</p>
                </Link>
            </FormControl>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: '400px' }}
        image="../images/adminlogin.jpeg"
        alt="Live from space album cover"
      />
    </Card>
        </Container>
        <Main_Bottom/>
        </div>
    );


}