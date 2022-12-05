import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import Main_Bottom from "../../com/Main_Bottom";
import { Box, Grid, Input, listItemAvatarClasses, Paper, Stack, TextField, Typography } from "@mui/material";
import { Container, textAlign } from "@mui/system";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";




export default function view_bbs(){

  const router = useRouter();
  const [b_idx, setBidx] = useState();
  const [list, setList] = useState();
  const API_VIEW = "/bbs/view";
  console.log(list);
  console.log(router.query.b_idx);
  const idx = router.query;
  console.log(b_idx);
  
  function getidx(){
    setBidx(idx);
  }

  function getList(){
    
    Axios.post(
      API_VIEW,null,
      {params:{b_idx: idx}}
    ).then((json) => {
        setList(json.data.list);
        console.log(json.data.list);
    })
  }

  useEffect(() => {
    if(!router.isReady) return;
    console.log(idx,'🙆‍♀️ 콘솔에 쿼리 찍힘!')
    getList();
  },[router.isReady]);

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
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="body2" gutterBottom>
                 asd
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  asd
              </Typography> 
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                asd
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              asd
            </Typography>
            <Typography variant="subtitle1" component="div">
              asd
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      </Paper>
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
     <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3, width:'1000px', marginLeft:'400px'}}>
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