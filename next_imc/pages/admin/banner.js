import { Box, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Pagination, Typography } from '@mui/material';
import Admin_Footer from '../../com/Admin_Footer';
import Admin_Navbar from '../../com/Admin_Navbar';
import Admin_Sidebar from '../../com/Admin_Sidebar';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';




export default function banner(){

    const router = useRouter();
    let num = router.query.cPage ? router.query.cPage : '1';
    let parsNum = parseInt(num);
    const LIST_URL = "/admin/banner/list";
    const [list, setList] = useState([]);
    const [cPage, setCpage] = useState(parsNum);
    const [totalPage, setTotalPage] = useState(1);

    const pageChange = (event, value) => {
        setCpage(value);
      };

    function getList(){
        Axios.post(
            LIST_URL, null,
            {params:{cPage:cPage, bname1:'BANNERMAIN', bname2:'BANNERBBS'}}
        ).then(json => {
            setTotalPage(json.data.totalPage);
            setList(json.data.list);
        })
    }

    useEffect(()=>{
        getList();
    },[]);

    useEffect(()=>{
        getList();
    },[cPage]);

    function write(){
        router.push({
            pathname: '/admin/write',
            query: {bname: 'BANNER', bbs:'banner'}
        })
    }

    return(

        <Box>
        <Admin_Navbar/>
        <Stack direction="row" spacing={2} justifyContent="space-between">  
            <Admin_Sidebar/>
            <Box flex={4} p={2} sx={{display:{xs:'none', sm:'block', backgroundColor:'lightgray'}}}>
                <Typography variant="h5" gutterBottom>
                    [ 광고 / 배너 관리 ]
                </Typography>
                <Button size="small" variant="contained" sx={{margin:"10px"}} onClick={write}>
                    글쓰기</Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>글 번호</TableCell>
                            <TableCell>카테고리</TableCell>
                            <TableCell>썸네일</TableCell>
                            <TableCell>광고 제목</TableCell>
                            <TableCell>글쓴이</TableCell>
                            <TableCell>날짜</TableCell>
                            <TableCell>삭제</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {list != null && list.map((data, index)=>
                                <TableRow key={index}>
                                    <TableCell>{data.b_idx}</TableCell>
                                    {(data.bname === 'BANNERMAIN') && (
                                        <TableCell>[메인]</TableCell>
                                    )}    
                                    {(data.bname === 'BANNERBBS') && (
                                        <TableCell>[게시판]</TableCell>
                                    )}  
                                    <TableCell>
                                        썸네일
                                    </TableCell>
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

    );

}
