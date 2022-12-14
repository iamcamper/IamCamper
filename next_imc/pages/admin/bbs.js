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
import { useEffect } from "react";




export default function bbs(){

 

    const router = useRouter();

    let sel = router.query.select;
    let val = router.query.value;

    const API_URL = "/admin/bbs/search";
    const DEL_URL = "/admin/bbs/del";
    const [select, setSelect] = useState();
    const [searchValue, setSearchValue] = useState();
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

    function getList(){

        setSelect(sel);
        setSearchValue(val);

        Axios.post(
            API_URL, null,
            {params: {category: sel, value: val, cPage: cPage}}
        ).then(json=>{
            setList(json.data.b_list);
            setTotalPage(json.data.totalPage);
        });

    }

    useEffect(()=>{
        if(sel != null){
            getList();
        }
    },[]);

    function del(idx){

            if(confirm("????????? ?????????????????????????")){
        
            Axios.post(
                DEL_URL, null,
                {params: {b_idx: idx}} 
            ).then(json=>{
                if(json.data.chk == 1){
                    alert("????????? ?????????????????????.");
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
                    [ ????????? ?????? ]
                </Typography>
                <Paper sx={{padding:"20px", margin:'auto'}}>
                    <div>????????? ??????</div>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="selectLabel">??????</InputLabel>
                        <Select
                        labelId="selectLabel"
                        id="select"
                        onChange={selectChange}
                        >
                            <MenuItem value="">
                                <em>??????</em>
                            </MenuItem>
                            <MenuItem value="bname">?????????</MenuItem>
                            <MenuItem value="nickname">?????????</MenuItem>
                            <MenuItem value="wdate">????????????</MenuItem>
                            <MenuItem value="subject">?????????</MenuItem>
                            <MenuItem value="content">?????????</MenuItem>
                        </Select>
                    </FormControl>
                    {select==='bname' && (

                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="bnameLabel">????????? ??????</InputLabel>
                        <Select
                        labelId="bnameLabel"
                        id="bname"
                        onChange={bnameChange}
                        >
                            <MenuItem value="">
                                <em>????????? ??????</em>
                            </MenuItem>
                            <MenuItem value="CAMREVIEW">????????????</MenuItem>
                            <MenuItem value="TSREVIEW">???????????????</MenuItem>
                            <MenuItem value="RESTREVIEW">????????????</MenuItem>
                            <MenuItem value="RESELL">????????????</MenuItem>
                            <MenuItem value="FREE">???????????????</MenuItem>
                        </Select>
                    </FormControl>

                    )}

                    {select==='wdate' && (

                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                         <TextField
                            name="??? ?????????"
                            label="??? ?????????"
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
                        <TextField fullWidth label="???????????? ????????? ?????????!" id="searchValue" onChange={changeValue}/>
                    </FormControl>

                    )}
                    <FormControl sx={{ m: 1 }}>
                        <Button variant="contained" size="large" endIcon={<Search />} onClick={searchList}>
                            ??????
                        </Button>
                    </FormControl>

                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>??? ??????</TableCell>
                            <TableCell>????????? ??????</TableCell>
                            <TableCell>??????</TableCell>
                            <TableCell>?????????</TableCell>
                            <TableCell>??????</TableCell>
                            <TableCell>??????</TableCell>
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
                                            query: {b_idx: data.b_idx, cPage: cPage, bbs:'bbs', select:select, value:searchValue},
                                    }}>
                                        {data.subject}
                                    </Link>
                                    </TableCell>
                                    <TableCell>{data.nickname}</TableCell>
                                    <TableCell>{data.write_date}</TableCell>
                                    <TableCell>
                                        <Button size='small' variant='contained' color='error' onClick={()=>{
                                            del(data.b_idx);
                                    }}>??????</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {(list == undefined || list.length < 0) && (
                                <TableRow key={1}>
                                    <TableCell colSpan={5}>????????? ????????? ????????????.</TableCell>
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