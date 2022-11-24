import { Box, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import Admin_Footer from '../../com/Admin_Footer';
import Admin_Navbar from '../../com/Admin_Navbar';
import Admin_Sidebar from '../../com/Admin_Sidebar';
import dynamic from 'next/dynamic';

const Edit = dynamic(()=> import('../../com/Admin_Editor'), {ssr:false});

export default function write(){

    return(

        <Box>
        <Admin_Navbar/>
        <Stack direction="row" spacing={2} justifyContent="space-between">  
            <Admin_Sidebar/>
            <Box flex={4} p={2} sx={{display:{xs:'none', sm:'block', backgroundColor:'lightgray'}}}>
            <h5>글쓰기</h5>
                <Paper sx={{padding:"20px"}}>
                    <form>
                        <label for="subject">글 제목 : </label>
                        <input type="text" name="subject" id="subject"/><br/>
                        <label for="content">글 내용 : </label>
                        <div id="editor">
                            <Edit/>
                        </div>
                    </form>
                </Paper>
            </Box>
        </Stack>
        <Admin_Footer/>

    </Box>


        );
    }
   