import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import Main_Bottom from "../../com/Main_Bottom";
import { Box, Grid, Input, Paper, Stack, TextField, Typography } from "@mui/material";
import { Container, textAlign } from "@mui/system";
export default function view_bbs(){
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
              <Typography gutterBottom variant="subtitle1" component="div">
                글 제목
              </Typography>
              <Typography variant="body2" gutterBottom>
                닉네임
              </Typography>
              <Typography variant="body2" color="text.secondary">
                작성일자
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
              aterial-UI에서 제공하는 컴포넌트의 종류는 도큐먼트들을 다 읽어보기 힘들 정도로 많다.

                  크게 Layout, Inputs, Navigation, Surfaces, Feedback, Data Display, Utils, Lab로 나눌 수 있고,

                  세부적으로 다 다루기보다 활용해서 적응할 수 있게끔 대표적인 예시를 들어가며 배우면 좋다.

                  

                  Layout
                  

                  먼저, 레이아웃에는 Box, Container, Grid, Hidden, Image List가 있다. 

                  Box는 div를 대체하는 강력하고 편리한 컴포넌트로 tailwind CSS 방식이고

                  Container는 레이아웃을 잡을 때 좌우 간격, 중앙 위치시킬 때 사용하며

                  최대 너비 제한 fluid모드와 동일 너비 강제 fixed 모드가 있다.

                  Grid는 Container 안의 레이아웃을 핸들링해주고 반응형으로 배치시켜야 하는 경우 유용하다.
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              게시판 이름
            </Typography>
            <Typography variant="subtitle1" component="div">
              추천수
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