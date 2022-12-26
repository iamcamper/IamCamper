import { Box, Stack, Paper, Button, Input, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, MenuItem, FormControl, Typography } from '@mui/material';
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
import { Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { useEffect } from 'react';



const Edit = dynamic(()=> import('../../com/Admin_Editor'), {ssr:false});

export default function write(){
    
    const nickname = getCookie("adminnickname");
    const editorRef = useRef();
    const [subject, setSubject] = useState();
    const WRITE_URL = "/admin/writeok";
    const router = useRouter();
    const [bname, setBname] = useState(router.query.bname);
    const bbs = router.query.bbs;
    const formData = new FormData();
    let file = null;

    function changeSubject(e){
        setSubject(e.target.value);
    }

    function changeBname(e){
        setBname(e.target.value);
    }

    function changeFile(e){
        file = e.target.files[0];
    }

    function writeOk(){

        if(subject.trim().length < 1){
            alert("글 제목을 입력해 주세요.");
            return;
        }

        formData.append("file", file);
        formData.append("nickname", nickname);
        formData.append("subject", subject);
        
       Axios.post(
            WRITE_URL, formData,
            {params:{
                content:editorRef.current?.getInstance().getHTML(),
                bname:bname,
                cPage:1,
            },
            headers:{'Content-Type': 'multipart/form-data',},},
        ).then(json => {
            alert("저장이 완료되었습니다!");
            router.push('/admin/'+bbs)
        }); 
    }

    return(

        <Box>
        <Admin_Navbar/>
        <Stack direction="row" spacing={2} justifyContent="space-between">  
            <Admin_Sidebar/>
            <Box flex={4} p={2} sx={{display:{xs:'none', sm:'block', backgroundColor:'lightgray'}}}>
            <Typography variant="h5" gutterBottom>
                    [ 글 작성하기 ]
            </Typography>
                <Paper sx={{padding:"20px", margin:'auto'}}>
                    <form encType='multipart/form-data' id='frm'>
                        <table>
                            <tbody>
                                <tr>
                                    <th style={{padding:'20px', textAlign:'left'}}>
                                        <label htmlFor='subject'>제목</label>
                                    </th>
                                    <td>
                                        <Input type='text' placeholder='제목' sx={{width:'450px'}} onChange={changeSubject}/>
                                    </td>
                                </tr>
                                {(bname === 'BANNER' || bname === 'BANNERMAIN' || bname === 'BANNERBBS') && (
                                <tr>
                                    <th style={{padding:'20px', textAlign:'left'}}>
                                        <label htmlFor='category'>카테고리</label>
                                    </th>
                                    <td>
                                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                            <InputLabel id="category">
                                                    카테고리
                                            </InputLabel>
                                                <Select labelId='category' onChange={changeBname} value={bname}>
                                                    <MenuItem value='BANNERMAIN'>
                                                        메인
                                                    </MenuItem>
                                                    <MenuItem value='BANNERBBS'>
                                                        게시판
                                                    </MenuItem>
                                                </Select>
                                        </FormControl>
                                    </td>
                                </tr>
                                )}
                                <tr>
                                    <th style={{padding:'20px', textAlign:'left'}}>
                                        <label htmlFor='nickname'>글쓴이</label>
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
                                        {(bname === 'BANNER' || bname === 'BANNERMAIN' || bname === 'BANNERBBS') && 
                                        ( <input type='file' id='file' onChange={changeFile} accept='.gif, .jpg, .png'/> )}
                                        {(bname === 'ADNOTICE') && (
                                          <input type='file' id='file' onChange={changeFile}/>
                                        )}
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
   
