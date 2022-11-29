import { Box, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import Admin_Footer from '../../com/Admin_Footer';
import Admin_Navbar from '../../com/Admin_Navbar';
import Admin_Sidebar from '../../com/Admin_Sidebar';
import dynamic from 'next/dynamic';
import { useState } from 'react';


const Edit = dynamic(()=> import('../../com/Admin_Editor'), {ssr:false});

export default function write(){

    return(

        <Box>
        <Admin_Navbar/>
        <Stack direction="row" spacing={2} justifyContent="space-between">  
            <Admin_Sidebar/>
            <Box flex={4} p={2} sx={{display:{xs:'none', sm:'block', backgroundColor:'lightgray'}}}>
            <h5>글 작성하기</h5>
                <Paper sx={{padding:"20px"}}>
                    <form>
                        <label for="subject">글 제목 : </label>
                        <input type="text" name="subject" id="subject"/><br/>
                        <label for="writer">작성자 : </label> <br/>
                        <label for="content">글 내용 : </label>
                        <div id="editor">
                            <Edit/>
                        </div>
                        <div style={{textAlign:'center', padding:'20px', margin:'10px'}}>
                            <Button variant="contained" sx={{margin:"10px"}}>글쓰기</Button>
                            <Button variant="contained" sx={{margin:"10px"}}>취소</Button>
                        </div>
                    </form>
                </Paper>
            </Box>
        </Stack>
        <Admin_Footer/>

    </Box>


        );
    }
   