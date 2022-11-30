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
import { Stack } from '@mui/material';

const Editbbs = dynamic(()=> import('./editor'), {ssr:false});

export default function edit_bbs(){
    const editorRef = useRef(null);

    

   const log = () => {
     if (editorRef.current) {
       console.log(editorRef.current.getContent());
     }
   };
   const [value, setValue] = useState('Controlled');

   const [bbs, setBbs] = useState('');

    const valueChange = (e) => {
        setValue(e.target.value);
       
    }; 
    const bbsChange = (e) => {
       setBbs(e.target.value);
    }; 
    
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
                    value={bbs}
                    label="bbs"
                    onChange={valueChange}
                >
                    <MenuItem value={0}>
                    <em>자유게시판</em>
                    </MenuItem>
                    <MenuItem value={1}>후기 게시판</MenuItem>
                    <MenuItem value={2}>맛집 게시판</MenuItem>
                    <MenuItem value={3}>중고거래 게시판</MenuItem>
                </Select>
            </FormControl>
            </Stack>
            <Stack items sx={{width:'300px', paddingLeft:'30px'}}>
                <TextField
                    id="standard-textarea"
                    label="제목"
                    placeholder="제목을 입력하세요"
                    multiline
                    variant="standard"
                />
            </Stack>
            <Stack items sx={{width:'300px', paddingLeft:'30px'}}>
                <TextField
                    id="standard-textarea"
                    label="제목"
                    placeholder="제목을 입력하세요"
                    multiline
                    variant="standard"
                />
            </Stack>
            </Stack>
             <Editbbs
             />
            </Paper>
          <div> 
            <Main_Bottom/>
          </div>
        </div>
    )
}