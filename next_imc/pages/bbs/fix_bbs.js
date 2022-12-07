import Main1 from '../../com/Main1';
import Main1_Menu from '../../com/Main1_Menu';
import Main_Bottom from '../../com/Main_Bottom';
import Main1_top from '../../com/Main_top';
import styles from '../../styles/Home.module.css';
import React, { useEffect, useRef, useState } from 'react';
 import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import dynamic from 'next/dynamic';
import { Button, getFormHelperTextUtilityClasses, Input, Stack } from '@mui/material';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Axios from 'axios';

const Editbbs = dynamic(()=> import('./editor'), {ssr:false});

export default function fix_bbs(){
    
    const nickname = 'testnick'; //getCookie("nickname");
    
    const [subject, setSubject] = useState({});
    const WRITE_URL = "/bbs/fixbbs";
    const router = useRouter();
    const formData = new FormData();    
    const [fix, setFix] = useState([]);
    const editorRef = useRef();
    
    console.log(fix);
    
    function getFixdata(){
        setFix(JSON.parse(router.query.list))
    };
   const [bname, setBname] = useState('');
   const [price, setPrice] = useState('');

    const BnameChange = (e) => {
        setBname(e.target.value);
        console.log(bname);
    }; 
    const subjectChange = (e) => {
        setSubject(e.target.value);
        console.log(subject);
    }
    const changePrice = (e) => {
        setPrice(e.target.value);
        console.log(price);
    }
    function changeFile(e){
        formData.append('file', e.target.files[0]);
    }
    const editSet = {
        editorRef: {editorRef},
    }

    function submit(){
        Axios.post(
            WRITE_URL, formData,
            {params:{nickname:nickname, 
                subject:subject, 
                content:editorRef.current?.getInstance().getHTML(),
                bname:bname,
                cPage:1,
                b_idx:b_idx,
            },
            headers:{'Content-Type': 'multipart/form-data',},},
        ).then(
            router.push('/bbs/free_bbs')
        );
    }

    useEffect(() => {
        getFixdata();
        console.log(fix['content'])
         },[]);
    
    
    return(
        <div className= {styles.container}>  
            <Main1_top/>
            <Main1/>
            <Main1_Menu/>
         <Paper sx={{width:'1600px', margin:'0 auto', textAlign:'center', height:'auto'}}>
            <h1> 게시글 수정 </h1>
        <Stack spacing={2} sx={{textAlign:'left', marginBottom:'50px'}}>
            <Stack items sx={{width:'200px'}}>
            <FormControl variant="filled" sx={{ marginLeft:'25px', minWidth: 300 }} size="small">
                <InputLabel id="demo-select-small" sx={{}}>게시판</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    defaultValue={fix.bname}
                    value={bname}
                    label="bbs"
                    onChange={BnameChange}
                >
                    <MenuItem value="자유게시판">
                    자유게시판
                    </MenuItem>
                    <MenuItem value="후기게시판">후기 게시판</MenuItem>
                    <MenuItem value="맛집게시판">맛집 게시판</MenuItem>
                    <MenuItem value="중고거래게시판">중고거래 게시판</MenuItem>
                </Select>
            </FormControl>
            </Stack>
            <Stack items sx={{width:'300px', paddingLeft:'30px'}}>
                <tr>
                    <th style={{padding:'20px', textAlign:'left'}}>
                         <label htmlFor='subject'>제목</label>
                    </th>
                    <td>
                        <Input placeholder='제목' sx={{width:'450px'}} onChange={subjectChange} value={fix.subject}/>
                     </td>
                </tr>
            </Stack>
                <Stack items sx={{width:'300px', paddingLeft:'30px'}}>
                <tr>
                                    <th style={{padding:'20px', textAlign:'left'}}>
                                        <label htmlFor='writer'>글쓴이</label>
                                    </th>
                                    <td>    
                                        {fix.nickname}
                                    </td>
                                </tr>
                </Stack> 
                {
                    (function() {
                        if (bname === '중고거래게시판') return (
                    <Stack items sx={{width:'300px', paddingLeft:'30px'}}>
                         <tr>
                            <th style={{padding:'20px', textAlign:'left'}}>
                                <label htmlFor='price'>금액</label>
                            </th>
                            <td>
                                <Input placeholder='금액' sx={{width:'450px'}} onChange={changePrice} value={fix.price}/>
                            </td>
                        </tr>
                   </Stack>
                            );
                    })()
                    }
                <Stack items sx={{width:'300px', paddingLeft:'30px'}}>
                         <th style={{padding:'20px', textAlign:'left'}}>
                                        <label htmlFor='file'>첨부 파일</label>
                                    </th>
                                    <td>
                                        <input type='file' id='file' onChange={changeFile} value={fix.fname}/>
                         </td>

                </Stack>
            </Stack>
             <Editbbs {...editSet}
             />
            </Paper>
            <div style={{textAlign:'center', padding:'20px', margin:'10px'}}>
                            <Button variant="contained" sx={{margin:"10px"}} onClick={submit}>글쓰기</Button>
                            <Button variant="contained" sx={{margin:"10px"}}>취소</Button>
                        </div>
          <div> 
            <Main_Bottom/>
          </div>
          
        </div>
    )
}