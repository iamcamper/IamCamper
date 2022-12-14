import { Box, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Pagination, Typography} from '@mui/material';
import { useRouter } from 'next/router';
import Admin_Footer from '../../com/Admin_Footer';
import Admin_Navbar from '../../com/Admin_Navbar';
import Admin_Sidebar from '../../com/Admin_Sidebar';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { hasCookie } from 'cookies-next';

export default function approve(){

    const router = useRouter();
    const LIST_URL = "/admin/reg/list";
    const [list, setList] = useState([]);
    const [cPage, setCPage] = useState('');
    const [totalPage, setTotalPage] = useState();
    const [cookieChk, setCookieChk] = useState(false);

    const APPROVE_URL = "/admin/reg/approve";

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

    function approve(m_idx){

        if(confirm("해당 회원의 관리자 페이지 가입을 승인하시겠습니까?")){

        Axios.post(
            APPROVE_URL, null,
            {params: {m_idx: m_idx}},
        ).then(json=>{
            if(json.data.chk==0){
                alert("승인 완료되었습니다!");
            }else{
                alert("승인 실패");
                return;
            }
        })

        } else {
            return;
        }

    }

    useEffect(()=>{
        getList();
    },[]);

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
                    [ 관리자 승인 ]
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>회원 번호</TableCell>
                            <TableCell>아이디</TableCell>
                            <TableCell>닉네임</TableCell>
                            <TableCell>이메일</TableCell>
                            <TableCell>가입 날짜</TableCell>
                            <TableCell>승인</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {list != null && list.map((data, index)=> 
                                <TableRow key={index}>
                                    <TableCell>{data.m_idx}</TableCell>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>{data.nickname}</TableCell>
                                    <TableCell>{data.email}</TableCell>
                                    <TableCell>{data.reg_date}</TableCell>
                                    <TableCell>
                                        <Button size='small' variant='contained' color='error' onClick={()=>{
                                            approve(data.m_idx);
                                        }}>승인</Button>
                                    </TableCell>
                                </TableRow>
                            )}
                            {list == null && (
                                <TableRow key='null'>
                                    <TableCell colSpan={6} sx={{textAlign:'center'}}>승인 요청을 한 회원이 없습니다.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
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
