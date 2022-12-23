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
    
    const nickname = getCookie("nickname");
    const WRITE_URL = "/bbs/fixbbs/submit";
    const router = useRouter();
    const content = router.query.content;
    const formData = new FormData();    
    const [fix, setFix] = useState([]);
    const editorRef = useRef();
    const [subject, setSubject] = useState(fix.subject);
    const b_idx = router.query.b_idx;
    
    console.log(fix);
    console.log(content);

    function getFixdata(){
        setFix(JSON.parse(router.query.list))
    };


   const [bname, setBname] = useState(router.query.bname);
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

    function submit(){
        Axios.post(
            WRITE_URL, formData,
            {params:{nickname:nickname, 
                subject:subject, 
                content:editorRef.current?.getInstance().getHTML(),
                bname:bname,    
                cPage:1,
                price:price,
                b_idx:b_idx,
            },
            headers:{'Content-Type': 'multipart/form-data',},},
        ).then(
            router.push('/bbs/free_bbs')
        );
    }

    useEffect(() => {
        getFixdata();
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
                <InputLabel id="demo-select-small" sx={{}}>{bname}</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    defaultValue={bname}
                    value={bname}
                    label="bbs"
                    onChange={BnameChange}
                >
                    <MenuItem value="FREE">
                    자유게시판
                    </MenuItem>
                    <MenuItem value="CAMREVIEW">후기 게시판</MenuItem>
                    <MenuItem value="RESTREVIEW">맛집 게시판</MenuItem>
                    <MenuItem value="RESELL">중고거래 게시판</MenuItem>
                </Select>
            </FormControl>
            </Stack>
            <Stack items sx={{width:'300px', paddingLeft:'30px'}}>
                <tr>
                    <th style={{padding:'20px', textAlign:'left'}}>
                         <label htmlFor='subject'>제목</label>
                    </th>
                    <td>
                        <Input defaultValue={fix.subject} placeholder='제목' sx={{width:'450px'}} onChange={subjectChange} value={fix.subject}/>
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
                        if (bname === 'RESELL') return (
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
                                        <input type='file' id='file' onChange={changeFile} defaultValue={fix.fname}/>
                         </td>

                </Stack>
            </Stack>
             <Editbbs editorRef={editorRef} content={content}
             /> 
            </Paper>
            <div style={{textAlign:'center', padding:'20px', margin:'10px'}}>
                            <Button variant="contained" sx={{margin:"10px"}} onClick={submit}>글수정</Button>
                            <Button variant="contained" sx={{margin:"10px"}} onClick={() => router.back()}>취소</Button>
                        </div>
          <div> 
            <Main_Bottom/>
          </div>
          
        </div>
    )
}