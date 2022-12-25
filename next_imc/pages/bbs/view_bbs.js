/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import Main_Bottom from "../../com/Main_Bottom";
import { Box, Button, FormControl, Grid, Input, Paper, Stack, TextField, Typography, useStepContext } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/Link";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';

const Viewer = dynamic(()=> import('./viewer'), {ssr:false});

export default function view_bbs(){

  const labels = {
    1: '별로에요',
    2: '애매해요',
    3: '괜찮아요',
    4: '좋아요',
    5: '최고에요',
  };
  
  
  const nickname = getCookie('nickname');
  const m_idx = getCookie('m_idx');
  const router = useRouter();
  let [list, setList] = useState({});
  const API_VIEW = "/bbs/view";
  const API_DEL = "/bbs/del";
  const API_Comm = "/bbs/commList";
  const API_Submit = "/bbs/commAdd";
  const API_LIKE = "/like/up";
  const API_DWN = "/like/dw";
  const API_CHK = "/like/chk";
  const API_Stat = "/bbs/buystat";
  const [comm, setComm] = useState([]);
  const [commin, setCommin] = useState('');
  const [likehit, setLikehit] = useState();
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);  
  const cPage = router.query.cPage;
  const b_idx = router.query.b_idx;
  const status = router.query.status; 
  const [buystatus, setBuystatus] = useState();

  function likesubmit(){
    if(likehit == 0){
      if(m_idx == null){
        alert("로그인이 필요합니다.");
        return;
      }
      Axios.post(
        API_LIKE,null,
        {params:{b_idx:b_idx, m_idx:m_idx}}
      ).then(
        setLikehit(1)
      )
    }else if(likehit == 1){
      
      Axios.post(
        API_DWN,null,
        {params:{b_idx:b_idx, m_idx:m_idx}}
      ).then(
        setLikehit(0)
      );
    }
    console.log(likehit);
  }
  let likecolor = {
    0 : <FavoriteBorderIcon/>,
    1 : <FavoriteIcon color="error"/>
  }

function likechk(){
  Axios.post(
    API_CHK,null,
    {params:{b_idx:b_idx, m_idx:m_idx}}
  ).then((json) =>{
    setLikehit(json.data.cnt);
  });
}
function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

  function fixAction(){
    router.push({
      pathname: "/bbs/fix_bbs",
      query: { list: list },
    }, '/bbs/fix_bbs');
  };

  function changeComm(e){
    setCommin(e.target.value);
  }
  function getList(){
    Axios.post(
      API_VIEW,null,
      {params:{b_idx:b_idx}}
    ).then((res) => {
      if(res.data == null){
        alert("데이터가 없습니다.");
        setList([]);
      }else{
        setList(res.data);
      }
    })
  }
  function getComm(){
    Axios.post(
      API_Comm,null,
      {params:{b_idx:b_idx}}
    ).then((json) => {
        if(json.data.clist === null)
          setComm([{nickname:'', content:'댓글이 없습니다'}])
          else(
          setComm(json.data.clist)
          )
    })
  }

  function commSubmit(){
    Axios.post(
      API_Submit, null,
      {params:{nickname:nickname, content:commin, b_idx:b_idx}}
    ).then(res => {
      setComm(res.data.clist);
    }
    );

  }
  function buyChange(e){
        setBuystatus(e.target.value)
        console.log(buystatus);
  } 
  function buystatsubmit(){
      Axios.post(
        API_Stat,null,
        {params:{status:buystatus, b_idx:b_idx}}
      ).then(
        router.back()
      )
  }
  function deletebbs(){
    Axios.post(
        API_DEL,null,
        {params:{b_idx:b_idx}}
    ).then(
      router.back()
    )
  }

  useEffect(() => {
    getList();
    getComm();  
    likechk();
    setBuystatus(status);
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
        height:'auto',
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
                <Typography variant="h2" gutterBottom>
                    {list.subject}
                </Typography>
                <Typography variant="h4" color="text.secondary" gutterBottom>
                    작성자: {list.nickname}
                </Typography>
                {(list.bname === 'RESELL' && <Typography variant="h3" color="text.secondary" gutterBottom>
                        금액:  {list.price}원
                      </Typography>)}
              </Grid><Grid>{
                list.nickname == nickname && (
                <><FormControl variant="standard" sx={{ width: '100px', marginLeft: 5 }}>
                     <InputLabel id="demo-simple-select-standard-label">거래상태</InputLabel>
                     <Select
                       labelId="demo-simple-select-standard-label"
                       id="demo-simple-select-standard"
                       value={buystatus}
                       onChange={buyChange}
                       label="검색종류"
                     >
                       <MenuItem value={3}>거래가능
                       </MenuItem>
                       <MenuItem value={4}>예약중</MenuItem>
                       <MenuItem value={5}>거래완료</MenuItem>
                     </Select>
                   </FormControl><Button variant="contained" size="small" sx={{marginTop:'15px', marginLeft:'15px'}} onClick={buystatsubmit}>거래상태수정</Button></>
                  )
              }</Grid>
              <Grid item>
                 <Viewer list={list.content}
                 />
                </Grid>
          </Grid>
        <Grid item sx={{textAlign:'right'}}>
          <Box
              sx={{
                width: 250,
                display: 'block',
                alignItems: 'center',
              }}
            >
            <Typography variant="subtitle1" component="div">
              게시판:{list.bname}
            </Typography>
            <Typography variant="subtitle1" component="div">
                    <IconButton aria-label="FavoriteBorder" onClick={likesubmit}>
                          추천:{likecolor[likehit]}
                    </IconButton>
            </Typography>
            </Box>
            {list.nickname == nickname && <Button variant="contained" size="medium" sx={{marginRight:'15px'}} onClick={deletebbs}>삭제</Button>}
          </Grid> 
        </Grid>
      </Grid>
      </Paper>
          <div style={{width:'1400px', margin:'auto', textAlign:'right', paddingTop:'10px'}}>          
              <Button variant="contained" size="large" sx={{marginRight:'15px'}} onClick={() => router.back()}>목록</Button>
              <Button variant="contained" size="large" x={{marginRight:'15px'}} ><Link href={{
                            pathname: '/bbs/fix_bbs',
                            query: { list: JSON.stringify(list), bname:list.bname, content:list.content, b_idx:b_idx},
                          }}>수정</Link></Button>   
            </div>
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
      {comm != null && comm.map((comm, l_idx) => (<Paper key={l_idx}
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
          </Grid> 
      </Grid> 
      </Paper>))} 
    </Box>
      <div> 
         <Main_Bottom/>
       </div> 
       </div>
   )
};

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}