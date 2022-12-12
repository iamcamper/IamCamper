import styles from '../../styles/Home.module.css'


import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Main1 from '../../com/Main1';
import Main1_Menu from '../../com/Main1_Menu';
import Main_Bottom from '../../com/Main_Bottom';
import Main_top from '../../com/Main_top';
import { Box, Button, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import  Axios  from 'axios';
import { useRouter } from 'next/router';



export default function Home() {
    const [list, setList] = useState([]);
    const [cPage, setCpage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const router = useRouter();

    const API_URL = "/bbs/list";

    function getList(){
        Axios.post(
            API_URL, null,
            {params:{bname:'중고거래게시판', cPage:cPage}}
          ).then((json) =>{
            setTotalPage(json.data.totalPage);
            console.log(json.data.list);
            setList(json.data.list);
          });
      }

      useEffect(() => {
        getList()
      },[]);

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
            {list.map((bbs, b_idx) => (
        <Grid item xs={4} key ={bbs.b_idx}>
                <CardHeader
                    title={bbs.subject}
                    subheader={bbs.write_date} />
                <CardMedia
                    component="img"
                    width="280"
                    height="290"
                    image="/images/adminlogin.jpeg"
                    alt="이미지" />
                <CardContent>
                    <Typography variant="h3" color="text.secondary">
                        {bbs.price}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Grid>))}
            </Grid>
        </Box>
        <div>
            <Main_Bottom />
        </div></>
  )
}