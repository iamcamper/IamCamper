import { Box, Container, Paper, FormControl, Stack, TextField, Button, Link, Card, CardContent, Typography, CardMedia } from '@mui/material';
import Main_Bottom from '../../com/Main_Bottom';

export default function login () {

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
                    <TextField name="id" label="Enter User ID" fullWidth autoFocus></TextField>
                    <TextField name="pw" label="Enter User Password" type="password" fullWidth></TextField>
                    <Button variant="contained" fullWidth>로그인</Button>
                </Stack>
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