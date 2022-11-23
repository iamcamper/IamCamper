import { Box, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import Admin_Navbar from '../../com/Admin_Navbar';
import Admin_Sidebar from '../../com/Admin_Sidebar';
import Main_Bottom from '../../com/Main_Bottom';


export default function notice(){

    return(

        <Box>
        <Admin_Navbar/>
        <Stack direction="row" spacing={2} justifyContent="space-between">  
            <Admin_Sidebar/>
            <Box flex={4} p={2} sx={{display:{xs:'none', sm:'block', backgroundColor:'lightgray'}}}>
                <h5>광고(배너) 등록 / 관리</h5>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>카테고리</TableCell>
                            <TableCell>광고 제목</TableCell>
                            <TableCell align="right">글쓴이</TableCell>
                            <TableCell align="right">날짜</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                            <TableCell component="th" scope="row">
                                [게시판]
                            </TableCell>
                            <TableCell align="left">별빛 캠핑장 행사</TableCell>
                            <TableCell align="right">admin</TableCell>
                            <TableCell align="right">2022-11-23</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell component="th" scope="row">
                                [메인]
                            </TableCell>
                            <TableCell align="left">기아! 새로운 캠핑카 출시!</TableCell>
                            <TableCell align="right">admin</TableCell>
                            <TableCell align="right">2022-11-23</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Stack>
        <Main_Bottom/>

    </Box>

    );

}