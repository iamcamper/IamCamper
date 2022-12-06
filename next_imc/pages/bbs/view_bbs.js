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

export default function view_bbs(){

  const router = useRouter();
  const [list, setList] = useState([]);
  const b_idx = router.query.idx;
  const API_VIEW = "/bbs/view?b_idx="+b_idx;
  
  
  console.log(b_idx);
  console.log(list);

  function getList(){
    Axios.get(
      API_VIEW
    ).then((res) => {
        setList(res.data);
    })
  }

  useEffect(() => {
    getList();
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
              <Button variant="contained" size="large" >수정</Button>
              <Button variant="contained" size="large">삭제</Button>
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
            <TextField fullWidth label="댓글을 입력하세요" id="fullWidth" />
          </Grid>
          <Grid item xs={1}>
            확인버튼
          </Grid>
        </Grid>
      </Paper>
     <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3, width:'1200px', marginLeft:'450px'}}>
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
          <Grid item xs zeroMinWidth>
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