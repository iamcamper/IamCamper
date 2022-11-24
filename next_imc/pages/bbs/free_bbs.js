
import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main_Bottom from "../../com/Main_Bottom";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import { Button, Grid } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import EditIcon from '@mui/icons-material/Edit';
import router from "next/router";
import Pagination from "react-js-pagination";
import Axios from "axios";
import { useState, useEffect } from "react";


export default function free_bbs(){ 
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);

  const handlePageChange = (page) => {
    setPage(page);
  };
  const API_URL = "http://localhost:8080/bbs/free"


  function getList(){
    Axios.get(
        API_URL
      ).then((res) =>{
        console.log(res.data.bbs_list);
        setList(res.data.bbs_list);
      });
  }

  useEffect(() => { //최초 한번만 호출하기 위해 사용함!
    getList();
  },[]);
  
    return(
      
          <div className= {styles.container}>  
            <Main1_top/>
            <Main1/>
            <Main1_Menu/>
          <div>
          <Paper sx={{width:'1600px', margin:'auto', textAlign:'center', height:'auto'}}>
            <Grid container my={8} style={{textAlign:'center', marginBottom:'15px'}}>
                <Grid item xs><Button variant="outlined" style={{width:'100%',height:"100%"}} onClick={()=>router.push("/camping/imc_camping")} > 자유 게시판 </Button></Grid>
                <Grid item xs><Button variant="outlined" style={{width:'100%',height:"100%"}} >후기 게시판</Button></Grid>
                <Grid item xs><Button variant="outlined" style={{width:'100%',height:"100%"}} > 맛집 게시판</Button></Grid>
                <Grid item xs><Button variant="outlined" style={{width:'100%',height:"100%"}}>중고 거래 게시판</Button></Grid>
          </Grid>
          <Grid item xs style={{textAlign:'right', marginTop:'0px'}}> 
            <Button variant="contained" style={{marginRight:'15px'}} onClick={()=>router.push("/bbs/edit_bbs")} startIcon={<EditIcon/>}>글쓰기</Button>
          </Grid>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
          <TableBody sx={{width: '1600px', height:'auto'}}>
                  {list.map((bbs) => (
                  <TableRow>
                    <TableCell>{bbs.b_idx}</TableCell>
                    <TableCell>{bbs.bname}</TableCell>
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
          <form className="search-form">
            <input type="text" placeholder="Search" className="search-input"/>
            <button type="submit" className="search-button">
              <img src={'/images/search_icon.png'}/>
            </button>
          </form>
           <Pagination
              activePage={page}
              itemsCountPerPage={5}
              totalItemsCount={450}
              pageRangeDisplayed={5}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={handlePageChange}
            />
      </div>
          <div> 
            <Main_Bottom/>
          </div>
        </div>
    )
}