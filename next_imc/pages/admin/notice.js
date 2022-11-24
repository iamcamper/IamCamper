import { Box, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import { useRouter } from 'next/router';
import Admin_Footer from '../../com/Admin_Footer';
import Admin_Navbar from '../../com/Admin_Navbar';
import Admin_Sidebar from '../../com/Admin_Sidebar';





export default function notice(){

    const router = useRouter();

    return(

        <Box>
        <Admin_Navbar/>
        <Stack direction="row" spacing={2} justifyContent="space-between">  
            <Admin_Sidebar/>
            <Box flex={4} p={2} sx={{display:{xs:'none', sm:'block', backgroundColor:'lightgray'}}}>
                <h5>공지사항</h5>
                <Button size="small" variant="contained" sx={{margin:"10px"}} onClick={()=>router.push("/admin/write")}>
                    글쓰기</Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>글 번호</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell align="right">글쓴이</TableCell>
                            <TableCell align="right">날짜</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell component="th" scope="row">
                                회원간 분쟁에 대한 공지사항
                            </TableCell>
                            <TableCell align="right">admin</TableCell>
                            <TableCell align="right">2022-11-23</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Stack>
        <Admin_Footer/>

    </Box>

    );

}