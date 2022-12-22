
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

import EditIcon from '@mui/icons-material/Edit';
import Axios from "axios";
import { useState, useEffect } from "react";
import Banner from "./banner";
import { getCookie, setCookie } from "cookies-next";


export default function free_bbs(){ 

    const cookie = getCookie("nickname");
    const [list, setList] = useState([]);
    const [cPage, setCpage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const API_URL = "/bbs/list";
    const router = useRouter();
    console.log(cookie);
  
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

  function edit(){
    router.push({
        pathname:'/bbs/edit_bbs',
    });
}
const pageChange = (event, value) => {
  setCpage(value);
};

  useEffect(() => { //최초 한번만 호출하기 위해 사용함!
    getList()
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

          <Paper sx={{ width: '1600px', margin: 'auto', textAlign: 'center', height: 'auto' }}>
            
            <Grid container my={8} style={{ textAlign: 'center', marginBottom: '15px' }}>
              <Grid item xs><Button variant="outlined" style={{ width: '100%', height: "100%" }} onClick={() => router.push("/bbs/free_bbs")}> 자유 게시판 </Button></Grid>
              <Grid item xs><Button variant="outlined" style={{ width: '100%', height: "100%" }} onClick={() => router.push("/bbs/campreview")}>후기 게시판</Button></Grid>
              <Grid item xs><Button variant="outlined" style={{ width: '100%', height: "100%" }} onClick={() => router.push("/bbs/rest_bbs")}> 맛집 게시판</Button></Grid>
              <Grid item xs><Button variant="outlined" style={{ width: '100%', height: "100%" }} onClick={() => router.push("/bbs/QNA")}>자주 하는 질문</Button></Grid>
            </Grid>

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
                  {list != null && list.map((bbs, index) => (
                    <TableRow key={index}>
                      <TableCell>{bbs.b_idx}</TableCell>
                       {bbs.status == 2 && <TableCell>규제된 글입니다.</TableCell>}
                        {bbs.status == 0 &&<TableCell> 
                            <Link
                            href={{
                              pathname: '/bbs/view_bbs',
                              query: { idx: bbs.b_idx },
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
          <form className="search-form">
            <input type="text" placeholder="Search" className="search-input" />
            <button type="submit" className="search-button">
              <img src={'/images/search_icon.png'} />
            </button>
          </form>
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