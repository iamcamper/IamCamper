/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import Main_Bottom from "../../com/Main_Bottom";
import { Box, Button, Grid, Input, Paper, Stack, TextField, Typography } from "@mui/material";
import { Container, textAlign } from "@mui/system";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import  ViewList  from "../../com/viewList";
import Link from "next/Link";
import SendIcon from '@mui/icons-material/Send';
import { getCookie } from "cookies-next";

export default function view_bbs(){

  const [nickname, setNickname] = useState("testnick");
  const router = useRouter();
  const b_idx = router.query.idx;
  const [list, setList] = useState([]);
  const API_VIEW = "/bbs/view?b_idx="+b_idx; 
  const API_DEL = "/bbs/del?b_idx="+b_idx;
  const API_Comm = "/bbs/commList?b_idx="+b_idx;
  const API_Submit = "/bbs/commAdd";
  const [comm, setComm] = useState([]);
  const [commin, setCommin] = useState('');
 

  console.log(commin);
  console.log(b_idx);
  console.log(list);

  function fixAction(){
    router.push({
      pathname: "/bbs/fix_bbs",
      query: { list: list },
    }, '/bbs/fix_bbs');
  };

  function changeComm(e){
    setCommin(e.target.value);
    console.log(commin);
  }
  function getList(){
    Axios.get(
      API_VIEW
    ).then((res) => {
        setList(res.data);
    })
  }
  function getComm(){
    Axios.get(
      API_Comm
    ).then((res) => {
        setComm(res.data.clist);
    })
  }

  function deleteList(){
    Axios.get(
      API_DEL
    ).then(() => {
      router.push("/bbs/free_bbs");
    })
  }

  function commSubmit(){
    Axios.post(
      API_Submit, null,
      {params:{nickname:"testnick", content:commin, b_idx:b_idx}}
    ).then(
      router.push("/bbs/view_bbs?b_idx="+b_idx)
    );

  }

  useEffect(() => {
    getList();
    getComm();  
     },[]);

   return( 
   <div className= {styles.container}>  
            <Main1_top/>
            <Main1/>
            <Main1_Menu/>
            <Paper
      sx={{
        p: 3,
        width:'1400px',
        height:'700px',
        margin: 'auto',
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <ViewList list={list}/>
      </Paper>
      <Grid item xs style={{ width: '1400px', textAlign: 'right', padding: '30px', margin: 'auto' }}>
          <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button variant="contained" size="large" onClick={() => router.back()}>목록</Button>
              <Button variant="contained" size="large" ><Link href={{
                            pathname: '/bbs/fix_bbs',
                            query: { list: JSON.stringify(list), bname:list.bname, content:list.content},
                          }}>수정</Link></Button>
                          {(function (){ 
                    if(list.nickname === nickname){
              <Button variant="contained" size="large" onClick={deleteList}>삭제</Button>
              }})}
              </Stack> 
            
          </Grid>
      <Paper
        sx={{
          my: 3,
          mx: 'auto',
          p: 2,
          width: '1400px',
          height: 'auto'
        }}
      >
        <Grid container wrap="nowrap" spacing={3}>
          <Grid item xs={1}>
            댓글 입력
          </Grid>
          <Grid item xs={10}>
            <TextField fullWidth label="댓글을 입력하세요" onChange={changeComm}/>
          </Grid>
          <Grid item xs={1}>
          <Button variant="contained" endIcon={<SendIcon />} onClick={commSubmit}>
            등록
          </Button>
          </Grid>
        </Grid>
      </Paper>
     <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3, width:'1200px', marginLeft:'450px'}}>
        {comm.map((comm) => (<Paper
        sx={{
          my: 4,
          mx: 'auto',
          p: 2,
        }}
      >
      <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
             {comm.nickname}
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{comm.content}</Typography>
          </Grid> </Grid> 
       
      </Paper>))} 
       
      <Paper
        sx={{
          my: 4,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            댓글 작성자
          </Grid>
          <Grid item xs>
            <Typography noWrap>댓글</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper
        sx={{
          my: 4,
          mx: 'auto',
          p: 2,
        }}
      >
      <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
          댓글 작성자
          </Grid>
          <Grid item xs>
            <Typography>댓글</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
      <div> 
         <Main_Bottom/>
       </div> 
       </div>
   )
}