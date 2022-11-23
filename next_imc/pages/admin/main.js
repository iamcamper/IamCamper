import Admin_Header from '../../com/Admin_Header';
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
import common from '@mui/material/colors';
import palette from '@mui/system';


/*const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));*/

export default function main(){

    return(
        <Box>
            <Admin_Navbar/>
            <Stack direction="row" spacing={2} justifyContent="space-between">  
                <Admin_Sidebar/>
              
            </Stack>
            <Main_Bottom/>
        </Box>
    );

}