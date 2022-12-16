import { Box, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import Admin_Footer from '../../com/Admin_Footer';
import Admin_Navbar from '../../com/Admin_Navbar';
import Admin_Sidebar from '../../com/Admin_Sidebar';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';



export default function banner(){

    const router = useRouter();
    const LIST_URL = "/admin/banner/list";
    const [list, setList] = useState([]);
    const [cPage, setCpage] = useState(1);
    const [totalPage, setTotalPage] = useState();

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
                <h5>광고(배너) 등록 / 관리</h5>
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
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((data, index)=>
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
                                    <TableCell>{data.subject}</TableCell>
                                    <TableCell>{data.nickname}</TableCell>
                                    <TableCell>{data.write_date}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Stack>
        <Admin_Footer/>

    </Box>

    );

}
