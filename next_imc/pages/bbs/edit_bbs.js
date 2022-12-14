/* eslint-disable react-hooks/rules-of-hooks */
import Main1 from '../../com/Main1';
import Main1_Menu from '../../com/Main1_Menu';
import Main_Bottom from '../../com/Main_Bottom';
import Main1_top from '../../com/Main_top';
import styles from '../../styles/Home.module.css';
import React, { useRef, useState } from 'react';
 import TextField from '@mui/material/TextField';
 import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import dynamic from 'next/dynamic';
import { Button, Input, Stack } from '@mui/material';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Axios from 'axios';

const Editbbs = dynamic(()=> import('./editor'), {ssr:false});

export default function edit_bbs(){
    
    const nickname = getCookie('nickname');
    const editorRef = useRef();
    const [subject, setSubject] = useState();
    const WRITE_URL = "/bbs/addbbs";
    const router = useRouter();
    const formData = new FormData();
    let file = null;
    const [bname, setBname] = useState('FREE');
    const [status, setStatus] = useState(0);
   const [price, setPrice] = useState('');

    
    const BnameChange = (e) => {
        setBname(e.target.value);
        if(e.target.value === "RESELL"){
            setStatus(3)
        }else{
            setStatus(0)
        }        
    };  
    

    const subjectChange = (e) => {
        setSubject(e.target.value);
    }
    const changePrice = (e) => {
        var checkprice = /[0-9]/gi
        if(checkprice.test(e.target.value) == false){
            alert("가격 칸에는 숫자만 입력하실 수 있습니다.");
            e.target.value = '';
            return;
        }else if(checkprice.test(e.target.value) == true){
            setPrice(e.target.value);
        }
    }
    function changeFile(e){
        file = e.target.files[0];
    }
    function submit(){

        formData.append("file", file);
        if(nickname == null){
            alert("로그인이 필요합니다")
        }else(
            formData.append("nickname", nickname)
        );
        if(subject == null){
            alert("제목을 입력해주세요");
            return;
        }else{
            formData.append("subject", subject);
        }
        Axios.post(
            WRITE_URL, formData,
            {params:{
                content:editorRef.current?.getInstance().getHTML(),
                bname:bname,
                price:price,
                cPage:1,
                status:status,
            },
            headers:{'Content-Type': 'multipart/form-data',},},
        ).then(
            router.back()
        );
    }
    
    return(
        <div className= {styles.container}>  
            <Main1_top/>
            <Main1/>
            <Main1_Menu/>
         <Paper sx={{width:'1600px', margin:'0 auto', textAlign:'center', height:'auto'}}>
            <h1> 게시글 작성 </h1>
        <Stack spacing={2} sx={{textAlign:'left', marginBottom:'50px'}}>
            <Stack items sx={{width:'200px'}}>
            <FormControl sx={{ marginLeft:'25px', minWidth: 300 }} size="small">
                <InputLabel id="demo-select-small" sx={{}}>게시판</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={bname}
                    label="bbs"
                    onChange={BnameChange}
                >
                    <MenuItem value={'FREE'}>자유게시판
                  </MenuItem>
                  <MenuItem value={'TSREVIEW'}>관광지후기게시판</MenuItem>
                  <MenuItem value={'RESTREVIEW'}>맛집게시판</MenuItem>
                  <MenuItem value={'RESELL'}>중고거래게시판</MenuItem>
                  <MenuItem value={'CAMREVIEW'}>캠핑리뷰게시판</MenuItem>
                </Select>
            </FormControl>
            </Stack>
            <Stack items sx={{width:'600px', paddingLeft:'30px'}}>
                <tr>
                    <th style={{padding:'20px', textAlign:'left'}}> 
                         <label htmlFor='subject'>제목</label>
                    </th>
                    <td>
                        <Input placeholder='제목' sx={{width:'450px'}} onChange={subjectChange}/>
                     </td>
                </tr>
            </Stack>
                <Stack items sx={{width:'600px', paddingLeft:'30px'}}>
                <tr>
                                    <th style={{padding:'20px', textAlign:'left'}}>
                                        <label htmlFor='writer'>글쓴이</label>
                                    </th>
                                    <td>
                                        {nickname}
                                    </td>
                                </tr>
                </Stack> 
                {
                bname === 'RESELL'
                 ?   <Stack items sx={{width:'600px', paddingLeft:'30px'}}>
                         <tr>
                            <th style={{padding:'20px', textAlign:'left'}}>
                                <label htmlFor='price'>금액</label>
                            </th>
                            <td>
                                <Input placeholder='금액' sx={{width:'450px'}} onChange={changePrice}/>
                            </td>
                        </tr>   
                   </Stack>
                : <Stack></Stack>
                    }
                <Stack items sx={{width:'300px', paddingLeft:'30px'}}>
                         <th style={{padding:'20px', textAlign:'left'}}>
                                        <label htmlFor='file'>첨부 파일</label>
                                    </th>
                                    <td>
                                        <input type='file' id='file' onChange={changeFile}/>
                         </td>

                </Stack>
            </Stack>
             <Editbbs editorRef={editorRef}
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
export async function getServerSideProps(context) {
    return {
      props: {},
    };
  }