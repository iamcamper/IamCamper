
import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main_Bottom from "../../com/Main_Bottom";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import { Button, Fab, Grid, Pagination, Stack, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/router';
import Link from "next/Link";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';

import EditIcon from '@mui/icons-material/Edit';
import Axios from "axios";
import { useState, useEffect } from "react";
import Banner from "./banner";
import { getCookie, setCookie } from "cookies-next";


export default function free_bbs(){ 


    const [cPage, setCpage] = useState('');
    const cookie = getCookie("nickname");
    const [list, setList] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const API_URL = "/bbs/list";
    const API_SEARCH = "/bbs/search";
    const router = useRouter();
    console.log(list);
    const [bbschk, setBbschk] = useState('');
    const [searchtxt, setSearchtxt] = useState('');
    const [waychk, setWaychk] = useState('');

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
        {params:{bname:'FREE', cPage:cPage}}
      ).then((json) =>{
        if(json.data.list == null){
          alert("데이터가 없습니다.");
          setList([]);
        }else{
        setList(json.data.list);
        }
        setTotalPage(json.data.totalPage);
        
      });
  }

  const bbstab = ['자유게시판', '후기게시판' , '맛집게시판' , '중고거래게시판']

  function edit(){
    router.push({
        pathname:'/bbs/edit_bbs',
    });
}
const pageChange = (event, value) => {
  setCpage(value);
};

  useEffect(() => { //최초 한번만 호출하기 위해 사용함!
    getList();
  },[cPage]);
  
    return(
         <div className={styles.container}>
          <Main1_top />
          <Main1 />
          <Main1_Menu />
          <Banner/>
          <div>
           <Typography variant="h3" color="text.secondary" sx={{width:1600, textAlign:'left', margin:'auto', padding:2}}>
                        자유게시판
            </Typography>
          </div>
        <div>
           <Grid container my={8} style={{ width:'1600px', textAlign: 'center', margin: 'auto', backgroundColor:'lightcyan' }}>
           <Grid item xs><Button variant="outlined" style={{ width: '100%', height: "100%" }} onClick={() => router.push("/bbs/free_bbs")}> 자유 게시판 </Button></Grid>
              <Grid item xs><Button variant="outlined" style={{ width: '100%', height: "100%" }} onClick={() => router.push("/bbs/campreview")}>캠핑 리뷰 게시판</Button></Grid>
              <Grid item xs><Button variant="outlined" style={{ width: '100%', height: "100%" }} onClick={() => router.push("/bbs/rest_bbs")}> 맛집 게시판</Button></Grid>
              <Grid item xs><Button variant="outlined" style={{ width: '100%', height: "100%" }} onClick={() => router.push("/bbs/tsreview")}>관광지 후기 게시판</Button></Grid>
            </Grid>
          <Paper sx={{ width: '1600px', margin: 'auto', textAlign: 'center', height: 'auto' }}>
            
           

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>글번호</TableCell>
                    <TableCell>글제목</TableCell>
                    <TableCell>작성자</TableCell>
                    <TableCell>작성일</TableCell>
                    <TableCell>추천</TableCell>
                    <TableCell>조회</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ width: '1600px', height: 'auto' }}>
                  <TableRow sx={{backgroundColor:'lightgrey'}}>
                    <TableCell>공지사항</TableCell>
                    <TableCell>공지제목</TableCell>
                    <TableCell>관리자</TableCell>
                    <TableCell>작성일</TableCell>
                    <TableCell>추천</TableCell>
                    <TableCell>조회</TableCell>
                  </TableRow>
                  {list != null && list.map((bbs, index) => (
                    <TableRow key={index}>
                      <TableCell>{bbs.b_idx}</TableCell>
                       {bbs.status == 2 && <TableCell>규제된 글입니다.</TableCell>}
                        {bbs.status == 0 &&<TableCell> 
                            <Link
                            href={{
                              pathname: '/bbs/view_bbs',
                              query: { b_idx: bbs.b_idx, cPage: cPage },
                            }}
                              >{bbs.subject}</Link></TableCell>}
                      <TableCell>{bbs.nickname}</TableCell>
                      <TableCell>{bbs.write_date}</TableCell>
                      <TableCell>{bbs.like}</TableCell>
                      <TableCell>{bbs.hit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>  
              </Table>
            </TableContainer>
          </Paper>
        </div>

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
        </div>
        
      </div>
    )
}
export async function getServerSideProps(context) {
  return {
    props: {},
  };
}