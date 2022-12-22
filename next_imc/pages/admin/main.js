import Admin_Sidebar from '../../com/Admin_Sidebar';
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Admin_Navbar from '../../com/Admin_Navbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from "@emotion/styled";
import Admin_Footer from '../../com/Admin_Footer';
import Dash_Chart1 from '../../com/Dash_Chart1';
import Dash_Chart2 from '../../com/Dash_Chart2';
import Dash_Chart3 from '../../com/Dash_Chart3';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dash_Chart4 from '../../com/Dash_Chart4';
import Dash_Chart5 from '../../com/Dash_Chart5';
import { ConstructionOutlined, Home } from '@mui/icons-material';
import { getCookie, hasCookie, setCookie } from 'cookies-next';



export default function main(){

    const API_URL = "/admin/main/data";

    const [todayReg, setTodayReg] = useState(''); //오늘 가입한 회원 수
    const [totalReg, setTotalReg] = useState(''); //전체 회원 수
    const [regData, setRegData] = useState([]); //최근 5일 가입한 회원 수 배열
    const [bbsTotalList, setBbsTotalList] = useState([]); //게시판별 오늘 토탈 글 갯수
    const [bestBbs, setBestBbs] = useState();
    const [cookieChk, setCookieChk] = useState(false);

    function getData(){

        Axios.post(
            API_URL, null,
        ).then(json => {

            setRegData(json.data.regList);
            setTotalReg(json.data.totalReg);
            setTodayReg(json.data.todayReg);
            setBbsTotalList(json.data.bbsTotalCntList);
            setBestBbs(json.data.bestBbs.bnameko);
        });


    }

    useEffect(()=>{

        if(hasCookie("adminid")){
            setCookieChk(true);
        } else {
            setCookieChk(false);
        }

        getData();
        
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
                        [ 대시보드 ]
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Paper elevation={3} sx={{textAlign: 'center', height: '160px'}}>
                                    <Dash_Chart1 regCount={todayReg}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper elevation={3} sx={{textAlign: 'center', height: '160px'}}>
                                    <Dash_Chart2 totalReg={totalReg}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper elevation={3} sx={{textAlign: 'center', height: '160px'}}>
                                    <Dash_Chart3 bestBbs={bestBbs}/>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Paper elevation={3} sx={{textAlign: 'center', height: '320px'}}>
                                    <Dash_Chart5 regData={regData}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper elevation={3} sx={{textAlign: 'center', height: '320px'}}>
                                    <Dash_Chart4 bbsTotalList={bbsTotalList}/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Stack>
                <Admin_Footer/>
            </Box>
            )}
            {!cookieChk && (
                <div>
                    <h1>잘못된 접근입니다.</h1>
                </div>
            )}
        </>
    );

}