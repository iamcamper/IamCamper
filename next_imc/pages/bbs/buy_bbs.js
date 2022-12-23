import styles from '../../styles/Home.module.css'

import EditIcon from '@mui/icons-material/Edit';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Main1 from '../../com/Main1';
import Main1_Menu from '../../com/Main1_Menu';
import Main_Bottom from '../../com/Main_Bottom';
import Main_top from '../../com/Main_top';
import { Box, Button, CardActions, CardContent, CardHeader, CardMedia, Fab, Grid, Link, Pagination, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import  Axios  from 'axios';
import { useRouter } from 'next/router';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';



export default function buy_bbs() {
  const API_SEARCH = "/bbs/search";
    const [list, setList] = useState([]);
    const [cPage, setCpage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const router = useRouter();

    const API_URL = "/bbs/list";
    console.log(list);
    const [bbschk, setBbschk] = useState('');
    const [searchtxt, setSearchtxt] = useState();
    const [waychk, setWaychk] = useState();
      console.log(searchtxt);

    const handleChange = (event) => {
      setBbschk(event.target.value);
      console.log(bbschk);
    };
    const whandleChange = (event) => {
      setWaychk(event.target.value);
    }
    function searchSubmit(){
      if(bbschk == null){
        alert('게시판을 선택해주세요')
        return;
      }else if(searchtxt == null){
        alert('검색내용을 입력해주세요')
        return;
      }else if(waychk == null){
        alert('검색종류를 선택해주세요')
        return;
      }
      console.log(bbschk);
      console.log(waychk);
      console.log(searchtxt);
       Axios.post(
        API_SEARCH, null,
        {params:{bname:bbschk, way:waychk, search:searchtxt, cPage:cPage}}
       ).then((json) => {
          if(json.data.list == null){
            alert("검색 결과가 없습니다.");
            return;
          }else{
            setList(json.data.list);
            setTotalPage(json.data.totalPage);
          }
       })
    }

    function getList(){
        Axios.post(
            API_URL, null,
            {params:{bname:'RESELL', cPage:cPage}}
          ).then((json) =>{
            
            if(json.data.list == null){
                alert("데이터가 없습니다.");
                setList([]);
              }else{
              setList(json.data.list);
              }setTotalPage(json.data.totalPage);
          });
      }

      useEffect(() => {
        getList();
      },[cPage]);

      function linkview(){
        router.push({
                        pathname: '/bbs/view_bbs',
                        query: { idx: list.b_idx },
                       })
      }
      function edit(){
        router.push({
            pathname:'/bbs/edit_bbs',
        });
    }
    const pageChange = (event, value) => {
        setCpage(value);
      };

  return (
    <>  <div className={styles.container}>
          <Main_top />
          <Main1 />
            <Main1_Menu />
            <div>
                <Typography variant="h3" color="text.secondary" sx={{width:1600, textAlign:'left', margin:'auto', padding:2}}>
                        중고 거래 게시판
                </Typography>
            </div>
            <Grid container my={8} style={{textAlign:'center', margin:'auto', width:'1600px'}}>
                <Grid item xs><Button variant="outlined" style={{width:'100%',height:"100%"}} onClick={()=>router.push("/bbs/free_bbs")} > 자유 게시판 </Button></Grid>
                <Grid item xs><Button variant="outlined" style={{width:'100%',height:"100%"}} onClick={() => router.push("/bbs/campreview")}>후기 게시판</Button></Grid>
                <Grid item xs><Button variant="outlined" style={{width:'100%',height:"100%"}} onClick={() => router.push("/bbs/rest_bbs")}> 맛집 게시판</Button></Grid>
                <Grid item xs><Button variant="outlined" style={{width:'100%',height:"100%"}} onClick={() => router.push("/bbs/QNA")}>자주 하는 질문</Button></Grid>
          </Grid>
             <Box sx={{ flexGrow: 1, width: '1600px', margin:'auto', padding:'30px' }}>
            <Grid container spacing={1}>
            {list != null && list.map((bbs, b_idx) => (
            <Grid item xs={4} key ={bbs.b_idx}>
                <CardHeader
                    title={bbs.subject}
                    subheader={bbs.write_date} />
                <CardActions onClick={() =>  router.push({
                        pathname: '/bbs/view_bbs',
                        query: { b_idx: bbs.b_idx },
                       })
                       }>
                <CardMedia
                    component="img"
                    image={bbs.thum_img}
                    sx={{width: 280, height: 290, objectFit: 'scale-down'}}
                     /></CardActions>
                <CardContent>
                    <Typography variant="h3" color="text.secondary">
                        {bbs.price} 원
                    </Typography>
                </CardContent>
            </Grid>))}
            </Grid>
        </Box>
        <div className="bottom-div">
          <Grid item xs style={{ width: '1600px', textAlign: 'right', padding: '30px', float: 'right' }}>
            <Fab color="secondary" aria-label="edit" onClick={edit}><EditIcon /></Fab>
          </Grid>
          <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '1000px'}}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">게시판검색</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={bbschk}
                  onChange={handleChange}
                  label="게시판검색"
                >
                  <MenuItem value={'FREE'}>자유게시판
                  </MenuItem>
                  <MenuItem value={'TSREVIEW'}>후기게시판</MenuItem>
                  <MenuItem value={'RESTREVIEW'}>맛집게시판</MenuItem>
                  <MenuItem value={'RESELL'}>중고거래게시판</MenuItem>
                </Select>
              </FormControl>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">검색종류</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={waychk}
                  onChange={whandleChange}
                  label="검색종류"
                >
                  <MenuItem value={'subject'}>제목
                  </MenuItem>
                  <MenuItem value={'nickname'}>작성자</MenuItem>
                  <MenuItem value={'content'}>글내용</MenuItem>
                </Select>
              </FormControl>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
               <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="검색내용을 입력해주세요"
                inputProps={{searchtxt}}
                onChange={(e) => {setSearchtxt(e.target.value)}}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={searchSubmit}>
                <SearchIcon />
              </IconButton>
              </Paper>
          <Stack spacing={2} sx={{display:'inline-block'}}>
          <Pagination count={totalPage} variant="outlined" shape="rounded" color='primary'
                            page={cPage}
                            onChange={pageChange}/>
          </Stack>
        </div>
        <div>
            <Main_Bottom />
        </div></div></>
  )
                    }
