
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
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';

import EditIcon from '@mui/icons-material/Edit';
import Axios from "axios";
import { useState, useEffect } from "react";
import Banner from "./banner";
import { getCookie, setCookie } from "cookies-next";
import { textAlign } from "@mui/system";


export default function free_bbs(){ 

  const API_SEARCH = "/bbs/search";
    const cookie = getCookie("nickname");
    const [list, setList] = useState([]);
    const [cPage, setCpage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const API_URL = "/bbs/list";
    const router = useRouter();
    const [bbschk, setBbschk] = useState('');
    const [searchtxt, setSearchtxt] = useState('');
    const [waychk, setWaychk] = useState('');
    const [notice, setNotice] = useState([]);

    const handleChange = (event) => {
      setBbschk(event.target.value);
    };
    const whandleChange = (event) => {
      setWaychk(event.target.value);
    }
    function searchSubmit(){
      if(bbschk == null){
        alert('???????????? ??????????????????')
        return;
      }else if(searchtxt == null){
        alert('??????????????? ??????????????????')
        return;
      }else if(waychk == null){
        alert('??????????????? ??????????????????')
        return;
      }
       Axios.post(
        API_SEARCH, null,
        {params:{bname:bbschk, way:waychk, search:searchtxt, cPage:cPage}}
       ).then((json) => {
          if(json.data.list == null){
            alert("?????? ????????? ????????????.");
            return;
          }else{
            setList(json.data.list);
            setTotalPage(json.data.totalPage);
          }
       })
    }
  
  function getList(){
    Axios.post(
        API_URL, null,
        {params:{bname:'RESTREVIEW', cPage:cPage}}
      ).then((json) =>{
        
        if(json.data.list == null){
          alert("???????????? ????????????.");
          setList([]);
        }else{
        setList(json.data.list);
      }setTotalPage(json.data.totalPage);
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
function getNotice(){
  Axios.post(
    API_URL, null,
    {params:{bname:'USERNOTICE', cPage:cPage}}
  ).then((json) =>{
    if(json.data.list == null){
      setNotice([]);
    }else{
    setNotice(json.data.list);
    }
  });
}

  useEffect(() => { //?????? ????????? ???????????? ?????? ?????????!
    getList();
    getNotice();
  },[cPage]);
  
    return(
         <div className={styles.container}>
          <Main1_top />
          <Main1 />
          <Main1_Menu />
          <div>
                <Typography variant="h3" color="text.secondary" sx={{width:1600, textAlign:'left', margin:'auto', padding:2}}>
                        ???????????????
                </Typography>
            </div>
        <div>

          <Paper sx={{ width: '1600px', margin: 'auto', textAlign: 'center', height: 'auto' }}>
            
          <Grid container my={8} style={{ width:'1600px', textAlign: 'center', margin: 'auto', backgroundColor:'lightcyan' }}>
             <Grid item xs><Button variant="outlined" style={{ width: '100%', height: "100%" }} onClick={() => router.push("/bbs/free_bbs")}> ?????? ????????? </Button></Grid>
              <Grid item xs><Button variant="outlined" style={{ width: '100%', height: "100%" }} onClick={() => router.push("/bbs/campreview")}>?????? ?????? ?????????</Button></Grid>
              <Grid item xs><Button variant="outlined" style={{ width: '100%', height: "100%" }} onClick={() => router.push("/bbs/rest_bbs")}> ?????? ?????????</Button></Grid>
              <Grid item xs><Button variant="outlined" style={{ width: '100%', height: "100%" }} onClick={() => router.push("/bbs/tsreview")}>????????? ?????? ?????????</Button></Grid>
            </Grid>

            <TableContainer component={Paper}>
              <Table aria-label="simple table" >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{width: 150}} align="center">?????????</TableCell>
                    <TableCell sx={{width: 250}} align="center">????????????</TableCell>
                    <TableCell sx={{width: 500}} align="center">?????????</TableCell>
                    <TableCell sx={{width: 250}} align="center">?????????</TableCell>
                    <TableCell sx={{width: 250}} align="center">?????????</TableCell>
                    <TableCell sx={{width: 100}} align="center">??????</TableCell>
                    <TableCell sx={{width: 100}} align="center">??????</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ width: '1600px', height: 'auto' }}>
                  {notice != null && notice.map((notice, index)=> (
                  <TableRow key={index} sx={{backgroundColor:'lightgrey'}}>
                    <TableCell align="center">{notice.b_idx}</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"><Link href={{
                      pathname: '/bbs/view_bbs',
                      query: { b_idx: notice.b_idx, cPage: cPage },
                    }}>{notice.subject}</Link></TableCell>
                    <TableCell align="center">?????????</TableCell>
                    <TableCell align="center">{notice.write_date}</TableCell>
                    <TableCell align="center">{notice.like}</TableCell>
                    <TableCell align="center">{notice.hit}</TableCell>
                  </TableRow>
                  ))}
                  {list != null && list.map((bbs, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{bbs.b_idx}</TableCell>
                      <TableCell align="center"><img src={bbs.thum_img} style={{ width: 200, height: 100, objectFit: 'scale-down'}}></img></TableCell>
                      <TableCell align="center">
                      <Link
                       href={{
                        pathname: '/bbs/view_bbs',
                        query: { b_idx: bbs.b_idx },
                       }}
                      >{bbs.subject}</Link></TableCell>
                      <TableCell align="center">{bbs.nickname}</TableCell>
                      <TableCell align="center">{bbs.write_date}</TableCell>
                      <TableCell align="center">{bbs.like}</TableCell>
                      <TableCell align="center">{bbs.hit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>  
              </Table>
            </TableContainer>
          </Paper>
        </div>
        <div className="bottom-div">
          <Grid item xs style={{ width: '1600px', textAlign: 'right', padding: '10px', float: 'right', position:'absolute' }}>
            <Fab color="secondary" aria-label="edit" onClick={edit}><EditIcon /></Fab>
          </Grid>
          <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '1000px', margin:'auto', marginTop:5}}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginBottom: 2 }}>
                <InputLabel id="demo-simple-select-standard-label">???????????????</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={bbschk}
                  onChange={handleChange}
                  label="???????????????"
                >
                  <MenuItem value={'FREE'}>???????????????
                  </MenuItem>
                  <MenuItem value={'TSREVIEW'}>????????????????????????</MenuItem>
                  <MenuItem value={'RESTREVIEW'}>???????????????</MenuItem>
                  <MenuItem value={'RESELL'}>?????????????????????</MenuItem>
                  <MenuItem value={'CAMREVIEW'}>?????????????????????</MenuItem>
                </Select>
              </FormControl>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginBottom:2 }}>
                <InputLabel id="demo-simple-select-standard-label">????????????</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={waychk}
                  onChange={whandleChange}
                  label="????????????"
                >
                  <MenuItem value={'subject'}>??????
                  </MenuItem>
                  <MenuItem value={'nickname'}>?????????</MenuItem>
                  <MenuItem value={'content'}>?????????</MenuItem>
                </Select>
              </FormControl>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
               <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="??????????????? ??????????????????"
                inputProps={{searchtxt}}
                onChange={(e) => {setSearchtxt(e.target.value)}}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={searchSubmit}>
                <SearchIcon />
              </IconButton>
              </Paper>
          <Stack spacing={2} sx={{display:'inline-block'}}>
          <Pagination count={totalPage} variant="outlined" shape="rounded" color='primary'
                            page={cPage} sx={{marginTop:2}}
                            onChange={pageChange}/>
          </Stack>
        </div>
        <div>
          <Main_Bottom />
        </div>
        
      </div>
    )
}
export async function getServerSideProps(context) {
  return {
    props: {},
  };
}