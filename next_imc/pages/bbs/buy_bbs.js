import styles from '../../styles/Home.module.css'


import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Main1 from '../../com/Main1';
import Main1_Menu from '../../com/Main1_Menu';
import Main_Bottom from '../../com/Main_Bottom';
import Main_top from '../../com/Main_top';
import { Box, Button, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

export default function Home() {

    function FormRow() {
        return (
        <><Grid item xs={4}>
                <CardHeader
                    title="제목"
                    subheader="날짜" />
                <CardMedia
                    component="img"
                    width="280"
                    height="290"
                    image="/images/adminlogin.jpeg"
                    alt="이미지" />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        내용
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Grid><Grid item xs={4}>
                    <CardHeader
                        title="제목"
                        subheader="날짜" />
                    <CardMedia
                        component="img"
                        width="280"
                        height="290"
                        image="/images/adminlogin.jpeg"
                        alt="이미지" />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            내용
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </CardActions>
                </Grid><Grid item xs={4}>
                    <CardHeader
                        title="제목"
                        subheader="날짜" />
                    <CardMedia
                        component="img"
                        width="280"
                    height="290"
                        image="/images/adminlogin.jpeg"
                        alt="이미지" />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            내용
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </CardActions>
                </Grid></>
        );
      }

  return (
    <>  <div className={styles.container}>
          <Main_top />
          <Main1 />
            <Main1_Menu />
        </div>
            <Grid container my={8} style={{textAlign:'center', margin:'auto', width:'1600px'}}>
                <Grid item xs><Button variant="outlined" style={{width:'100%',height:"100%"}} onClick={()=>router.push("/bbs/free_bbs")} > 자유 게시판 </Button></Grid>
                <Grid item xs><Button variant="outlined" style={{width:'100%',height:"100%"}} >후기 게시판</Button></Grid>
                <Grid item xs><Button variant="outlined" style={{width:'100%',height:"100%"}} > 맛집 게시판</Button></Grid>
                <Grid item xs><Button variant="outlined" style={{width:'100%',height:"100%"}} onClick={()=>router.push("/bbs/buy_bbs")}>중고 거래 게시판</Button></Grid>
          </Grid>
             <Box sx={{ flexGrow: 1, width: '1600px', margin:'auto', padding:'30px' }}>
            <Grid container spacing={1}>
                <Grid container item spacing={8}>
                <FormRow />
                </Grid>
                <Grid container item spacing={8}>
                <FormRow />
                </Grid>
                <Grid container item spacing={8}>
                <FormRow />
                </Grid>
            </Grid>
        </Box>
        <div>
            <Main_Bottom />
        </div></>
  )
}