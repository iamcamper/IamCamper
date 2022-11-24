import Admin_Sidebar from '../../com/Admin_Sidebar';
import { Box, Container, Stack } from "@mui/material";
import Admin_Navbar from '../../com/Admin_Navbar';
import Main_Bottom from '../../com/Main_Bottom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from "@emotion/styled";

export default function main(){
    return(
        <Box>
            <Admin_Navbar/>
            <Stack direction="row" spacing={2} justifyContent="space-between">  
                <Admin_Sidebar/>
                <Box flex={4} p={2} sx={{display:{xs:'none', sm:'block', backgroundColor:'lightgray'}}}>
                    <h5>공지사항</h5>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>제목</TableCell>
                                <TableCell align="right">글쓴이</TableCell>
                                <TableCell align="right">날짜</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
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
            <Main_Bottom/>

        </Box>
    );

}