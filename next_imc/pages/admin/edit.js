import { Box, Stack, Paper, Button, Input, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, MenuItem, FormControl } from '@mui/material';
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
import TextField from '@mui/material/TextField';




const Edit = dynamic(()=> import('../../com/Admin_Editor'), {ssr:false});

export default function write(){

    const editorRef = useRef("");
    const [subject, setSubject] = useState("");
    const router = useRouter();
    const [bname, setBname] = useState(router.query.bname);
    const [content, setContent] = useState("");
    const bbs = router.query.bbs;
    const cPage= router.query.cPage;
    const formData = new FormData();
    let file = null;

    const b_idx = router.query.b_idx;
    const [data, setData] = useState({});
    const DATA_URL = "/admin/edit/data";
    const EDIT_URL = "/admin/edit/ok";

    function getData(){
        Axios.post(
            DATA_URL, null,
            {params:{b_idx:b_idx}},
        ).then(json=>{
            setData(json.data.data);
            setContent(json.data.data?.content);
            setSubject(json.data.data?.subject);
        });
    }


    useEffect(()=>{
        getData();
    },[]);

    
    function changeSubject(e){
        setSubject(e.target.value);
    }

    function changeBname(e){
        setBname(e.target.value);
    }

    function changeFile(e){
        file = e.target.files[0];
    }

    function cen(){
        router.push({
            pathname:'/admin/'+bbs,
            query:{cPage:cPage}
        })
    }

    function editOk(){

        formData.append("file", file);
        formData.append("nickname", data.nickname);
        formData.append("subject", subject);
        
       Axios.post(
            EDIT_URL, formData,
            {params:{
                content:editorRef.current?.getInstance().getHTML(),
                bname: bname,
                cPage: router.query.cPage,
                b_idx: router.query.b_idx,
            },
            headers:{'Content-Type': 'multipart/form-data',},},
        ).then(
            router.push({
                pathname:'/admin/views',
                query:{cPage: cPage, b_idx: b_idx, bname: bname, bbs:bbs}
            })
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
                    <form encType='multipart/form-data' id='frm'>
                        <table>
                            <tbody>
                                <tr>
                                    <th style={{padding:'20px', textAlign:'left'}}>
                                        <label htmlFor='subject'>제목</label>
                                    </th>
                                    <td>
                                        <Input type='text' key={data.b_idx} placeholder='제목' sx={{width:'450px'}} onChange={changeSubject} defaultValue={subject || ''}/>
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
                                                <Select labelId='category' onChange={changeBname} value={bname || ''}>
                                                    <MenuItem value={'BANNERMAIN' || ''}>
                                                        메인
                                                    </MenuItem>
                                                    <MenuItem value={'BANNERBBS' || ''}>
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
                                        {data.nickname}
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
                                        <Edit editorRef={editorRef} content={data.content}/>
                                    </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{textAlign:'center', padding:'20px', margin:'10px'}}>
                            <Button variant="contained" sx={{margin:"10px"}} onClick={editOk}>수정</Button>
                            <Button variant="contained" sx={{margin:"10px"}} onClick={cen}>취소</Button>
                        </div>
                    </form>
                </Paper>
            </Box>
        </Stack>
        <Admin_Footer/>
    </Box>

        );
    }
   