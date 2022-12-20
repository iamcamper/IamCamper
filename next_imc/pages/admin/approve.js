import { Box, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Pagination} from '@mui/material';
import { useRouter } from 'next/router';
import Admin_Footer from '../../com/Admin_Footer';
import Admin_Navbar from '../../com/Admin_Navbar';
import Admin_Sidebar from '../../com/Admin_Sidebar';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function approve(){

    const router = useRouter();
    const LIST_URL = "/admin/reg/list";
    const [list, setList] = useState([]);
    const [cPage, setCPage] = useState('');
    const [totalPage, setTotalPage] = useState();

    const pageChange = (event, value) => {
        setCPage(value);
    };
    
    function getList(){

        Axios.post(
            LIST_URL, null,
        ).then(json =>{
            setList(json.data.list);
        })
    }

    useEffect(()=>{
        getList();
    },[]);

    return(

        <Box>
        <Admin_Navbar/>
        <Stack direction="row" spacing={2} justifyContent="space-between">  
            <Admin_Sidebar/>
            <Box flex={4} p={2} sx={{display:{xs:'none', sm:'block', backgroundColor:'lightgray'}}}>
                <h5>관리자 승인</h5>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>아이디</TableCell>
                            <TableCell>닉네임</TableCell>
                            <TableCell>이메일</TableCell>
                            <TableCell>가입 날짜</TableCell>
                            <TableCell>승인</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((data, index)=> 
                                <TableRow key={index}>
                                    <TableCell>{data.m_idx}</TableCell>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>{data.nickname}</TableCell>
                                    <TableCell>{data.email}</TableCell>
                                    <TableCell>{data.reg_date}</TableCell>
                                    <TableCell align='center'>
                                        <Button size='small' variant='contained' color='error'>승인</Button>
                                    </TableCell>
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
