import { Box, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Input } from '@mui/material';
import Admin_Footer from '../../com/Admin_Footer';
import Admin_Navbar from '../../com/Admin_Navbar';
import Admin_Sidebar from '../../com/Admin_Sidebar';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { hasCookie, getCookie } from 'cookies-next';
import Axios from 'axios';
import { useRef } from 'react';


const Edit = dynamic(()=> import('../../com/Admin_Editor'), {ssr:false});

export default function write(){
    
    const nickname = getCookie("nickname");

    const editorRef = useRef<any>(null);

    function writeOk(){
        console.log(editRef.current?.getInstance().getHTML());
    }

    return(

        <Box>
        <Admin_Navbar/>
        <Stack direction="row" spacing={2} justifyContent="space-between">  
            <Admin_Sidebar/>
            <Box flex={4} p={2} sx={{display:{xs:'none', sm:'block', backgroundColor:'lightgray'}}}>
            <h5>글 작성하기</h5>
                <Paper sx={{padding:"20px", margin:'auto'}}>
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{padding:'20px'}}>
                                        <label htmlFor='subject'>제목</label>
                                    </td>
                                    <td>
                                        <Input placeholder='제목' sx={{width:'450px'}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{padding:'20px'}}>
                                        <label htmlFor='writer'>글쓴이</label>
                                    </td>
                                    <td>
                                        {nickname}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{padding:'20px'}}>
                                        <label htmlFor='content'>내용</label>
                                    </td>
                                    <td>
                                    <div id="editor">
                                        <Edit editorRef={editorRef}/>
                                    </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{textAlign:'center', padding:'20px', margin:'10px'}}>
                            <Button variant="contained" sx={{margin:"10px"}} onClick={writeOk}>글쓰기</Button>
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
   