import { Box, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Pagination, Typography} from '@mui/material';
import { useRouter } from 'next/router';
import Admin_Footer from '../../com/Admin_Footer';
import Admin_Navbar from '../../com/Admin_Navbar';
import Admin_Sidebar from '../../com/Admin_Sidebar';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { hasCookie } from 'cookies-next';
import { useLocation } from 'react-router-dom';



export default function notice(){
    
    const router = useRouter();
    let num = router.query.cPage ? router.query.cPage : '1';
    let parsNum = parseInt(num);
    const LIST_URL = "/admin/notice/list";
    const [list, setList] = useState([]);
    const [cPage, setCPage] = useState(parsNum);
    const [totalPage, setTotalPage] = useState();
    const [cookieChk, setCookieChk] = useState(false);

    const pageChange = (event, value) => {
        setCPage(value);
    };
    
    function getList(){

        Axios.post(
            LIST_URL, null,
            {params:{bname:'ADNOTICE', cPage:cPage}}
        ).then(json =>{
            setTotalPage(json.data.totalPage);
            setList(json.data.list);
        })
    }

    function write(){
        router.push({
            pathname:'/admin/write',
            query: {bname:'ADNOTICE', bbs:'notice'},
        });
    }

    useEffect(()=>{
        getList();
    },[]);

    useEffect(()=>{
        getList();
    },[cPage]);

    useEffect(()=>{
        if(hasCookie("adminid")){
            setCookieChk(true);
        } else {
            setCookieChk(false);
        }
    },[]);


    return(
    <>
        {cookieChk && (
        <Box>
            <Admin_Navbar/>
            <Stack direction="row" spacing={2} justifyContent="space-between">  
                <Admin_Sidebar/>
                <Box flex={4} p={2} sx={{display:{xs:'none', sm:'block', backgroundColor:'lightgray'}}}>
                <Typography variant="h5" gutterBottom>
                    [ 공지사항 ]
                </Typography>
                    <Button size="small" variant="contained" sx={{margin:"10px"}} onClick={write}>
                        글쓰기</Button>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>글 번호</TableCell>
                                    <TableCell>제목</TableCell>
                                    <TableCell align="right">글쓴이</TableCell>
                                    <TableCell align="right">날짜</TableCell>
                                    <TableCell align="right">조회수</TableCell>
                                    <TableCell align='center'>삭제</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list != null && list.map((data, index)=> 
                                    <TableRow key={index}>
                                    <TableCell>{data.b_idx}</TableCell>
                                        <TableCell>
                                            <Link href={{
                                                pathname: "/admin/views",
                                                query: {b_idx: data.b_idx, cPage: cPage, bname:'ADNOTICE', bbs:'notice'},
                                            }}>
                                                {data.subject}
                                            </Link>
                                        </TableCell>
                                    <TableCell align="right">{data.nickname}</TableCell>
                                    <TableCell align="right">{data.write_date}</TableCell>
                                    <TableCell align="right">{data.hit}</TableCell>
                                    <TableCell align='center'>
                                        <Button size='small' variant='contained' color='error'>삭제</Button>
                                    </TableCell>
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
                </Box>
            </Stack>
            <Admin_Footer/>
        </Box>
        )}
        {!cookieChk &&(
            <div>
                <h1>잘못된 접근입니다.</h1>
            </div>
        )}
    </>

    );

}
