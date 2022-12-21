import { Search } from "@mui/icons-material";
import { Box, Button, FormControl, getListItemAvatarUtilityClass, InputLabel, MenuItem, Pagination, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Router } from "react-router-dom";
import Admin_Footer from "../../com/Admin_Footer";
import Admin_Navbar from "../../com/Admin_Navbar";
import Admin_Sidebar from "../../com/Admin_Sidebar";




export default function bbs(){

    const router = useRouter();
    const API_URL = "/admin/bbs/search";
    const DEL_URL = "/admin/bbs/del";
    const [select, setSelect] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [list, setList] = useState([]);
    const [cPage, setCpage] = useState('');
    const [totalPage, setTotalPage] = useState('');

    function selectChange(e){
        setSelect(e.target.value);
    }

    function bnameChange(e){
        setSearchValue(e.target.value);
    }

    function wDateChange(e){
        setSearchValue(e.target.value);
    }

    function changeValue(e){
        setSearchValue(e.target.value);
    }
    
    function searchList(){

        Axios.post(
            API_URL, null,
            {params: {category: select, value: searchValue, cPage: cPage}}
        ).then(json=>{
            setList(json.data.b_list);
            setTotalPage(json.data.totalPage);
        });

    }

    function pageChange(){

    }

    function del(idx){

            if(confirm("정말로 삭제하시겠습니까?")){
        
            Axios.post(
                DEL_URL, null,
                {params: {b_idx: idx}} 
            ).then(json=>{
                if(json.data.chk == 1){
                    alert("삭제가 완료되었습니다.");
                    searchList();
                }
            });
        } else {
            return;
        }

    }

    return(

        <Box>
        <Admin_Navbar/>
        <Stack direction="row" spacing={2} justifyContent="space-between">  
            <Admin_Sidebar/>
            <Box flex={4} p={2} sx={{display:{xs:'none', sm:'block', backgroundColor:'lightgray'}}}>
                <Typography variant="h5" gutterBottom>
                    [ 게시글 관리 ]
                </Typography>
                <Paper sx={{padding:"20px", margin:'auto'}}>
                    <div>게시글 검색</div>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="selectLabel">선택</InputLabel>
                        <Select
                        labelId="selectLabel"
                        id="select"
                        onChange={selectChange}
                        >
                            <MenuItem value="">
                                <em>선택</em>
                            </MenuItem>
                            <MenuItem value="bname">게시판</MenuItem>
                            <MenuItem value="nickname">작성자</MenuItem>
                            <MenuItem value="wdate">글작성일</MenuItem>
                            <MenuItem value="subject">글제목</MenuItem>
                            <MenuItem value="content">글내용</MenuItem>
                        </Select>
                    </FormControl>
                    {select==='bname' && (

                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="bnameLabel">게시판 이름</InputLabel>
                        <Select
                        labelId="bnameLabel"
                        id="bname"
                        onChange={bnameChange}
                        >
                            <MenuItem value="">
                                <em>게시판 이름</em>
                            </MenuItem>
                            <MenuItem value="CAMREVIEW">캠핑후기</MenuItem>
                            <MenuItem value="TSREVIEW">관광지후기</MenuItem>
                            <MenuItem value="RESTREVIEW">맛집후기</MenuItem>
                            <MenuItem value="RESELL">중고거래</MenuItem>
                            <MenuItem value="FREE">자유게시판</MenuItem>
                        </Select>
                    </FormControl>

                    )}

                    {select==='wdate' && (

                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                         <TextField
                            name="글 작성일"
                            label="글 작성일"
                            type="date"
                            defaultValue="2017-05-24"
                            sx={{ width: 220 }}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={wDateChange}
                            />
                    </FormControl>

                    )}

                    {(select==='nickname' || select==='subject' || select==='content') && (

                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <TextField fullWidth label="검색어를 입력해 주세요!" id="searchValue" onChange={changeValue}/>
                    </FormControl>

                    )}
                    <FormControl sx={{ m: 1 }}>
                        <Button variant="contained" size="large" endIcon={<Search />} onClick={searchList}>
                            검색
                        </Button>
                    </FormControl>

                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>글 번호</TableCell>
                            <TableCell>게시판 이름</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>글쓴이</TableCell>
                            <TableCell>날짜</TableCell>
                            <TableCell>삭제</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {(list != null && list.length > 0) && (list.map((data, index)=>
                                <TableRow key={index}>
                                    <TableCell>{data.b_idx}</TableCell>
                                    <TableCell>{data.bname}</TableCell>
                                    <TableCell>
                                    <Link href={{
                                            pathname: "/admin/views",
                                            query: {b_idx: data.b_idx, cPage: cPage, bname:data.bname, bbs:'banner'},
                                    }}>
                                        {data.subject}
                                    </Link>
                                    </TableCell>
                                    <TableCell>{data.nickname}</TableCell>
                                    <TableCell>{data.write_date}</TableCell>
                                    <TableCell>
                                        <Button size='small' variant='contained' color='error' onClick={()=>{
                                            del(data.b_idx);
                                    }}>삭제</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {(list == undefined || list.length < 0) && (
                                <TableRow key={1}>
                                    <TableCell rowSpan={5}>검색된 내용이 없습니다.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2}>
                        <Pagination count={totalPage} 
                            variant="outlined" 
                            shape="rounded" 
                            color='primary' 
                            sx={{marginTop:'30px'}}
                            page={cPage}
                            onChange={pageChange}/>
                </Stack>
                </Paper>
            </Box>
        </Stack>
        <Admin_Footer/>
    </Box>

    );

}