import { Box, Stack, Paper, Button, Input, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import Admin_Footer from '../../com/Admin_Footer';
import Admin_Navbar from '../../com/Admin_Navbar';
import Admin_Sidebar from '../../com/Admin_Sidebar';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { hasCookie, getCookie } from 'cookies-next';
import Axios from 'axios';
import { useRef } from 'react';
import { useRouter } from 'next/router';



const Edit = dynamic(()=> import('../../com/Admin_Editor'), {ssr:false});

export default function write(){
    
    const nickname = getCookie("nickname");
    const editorRef = useRef();
    const [subject, setSubject] = useState();
    const WRITE_URL = "/admin/writeok";
    const router = useRouter();
    const bname = router.query.bname;
    const bbs = router.query.bbs;
    const formData = new FormData();

    function changeSubject(e){
        setSubject(e.target.value);
    }
    
    function changeFile(e){
        formData.append('file', e.target.files[0]);
    }

    function writeOk(){

        Axios.post(
            WRITE_URL, formData,
            {params:{nickname:nickname, 
                subject:subject, 
                content:editorRef.current?.getInstance().getHTML(),
                bname:bname,
                cPage:1,
            },
            headers:{'Content-Type': 'multipart/form-data',},},
        ).then(
            router.push('/admin/'+bbs)
        );
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
                                    <th style={{padding:'20px', textAlign:'left'}}>
                                        <label htmlFor='subject'>제목</label>
                                    </th>
                                    <td>
                                        <Input placeholder='제목' sx={{width:'450px'}} onChange={changeSubject}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{padding:'20px', textAlign:'left'}}>
                                        <label htmlFor='writer'>글쓴이</label>
                                    </th>
                                    <td>
                                        {nickname}
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{padding:'20px', textAlign:'left'}}>
                                        <label htmlFor='file'>첨부 파일</label>
                                    </th>
                                    <td>
                                        <input type='file' id='file' onChange={changeFile}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{padding:'20px', textAlign:'left'}}>
                                        <label htmlFor='content'>내용</label>
                                    </th>
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
   