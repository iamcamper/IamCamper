import Main1 from '../../com/Main1';
import Main1_Menu from '../../com/Main1_Menu';
import Main_Bottom from '../../com/Main_Bottom';
import Main_top from '../../com/Main_top';
import styles from '../../styles/Home.module.css'
import { Box, Button, CardActions, CardContent, CardHeader, CardMedia, Fab, Grid, Link, Pagination, Paper, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import Axios from "axios";
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export default function QNA(){

    const API_URL = "/bbs/list";
    const router = useRouter();
    const [list, setList] = useState([]);
    const [cPage, setCpage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      

    function edit(){
        router.push({
            pathname:'/bbs/edit_bbs',
        });
    }
    const pageChange = (event, value) => {
        setCpage(value);
      };

    function getList(){
        Axios.post(
            API_URL, null,
            {params:{bname:'QNA', cPage:cPage}}
          ).then((json) =>{
            if(json.data.list == null){
              alert("데이터가 없습니다.");
              setTotalPage(1);
              setList([]);
            }else{
            setList(json.data.list);
            }
            setTotalPage(json.data.totalPage);
          });
      }

      useEffect(() => { //최초 한번만 호출하기 위해 사용함!
        getList()
      },[cPage]);

    return(
            <div className={styles.container}>
            <Main_top />
            <Main1 />
            <Main1_Menu />
            <div>
                <Typography variant="h3" color="text.secondary" sx={{width:1600, textAlign:'left', margin:'auto', padding:2}}>
                        자주하는 질문
                </Typography>
            </div>
            <Paper sx={{ width: '1600px', margin: 'auto', textAlign: 'center', height: '600px', padding:1}}>
           {list != null && list.map((list, index) => (
                <Paper key={index}
                    sx={{
                        p: 2,
                        margin: '50px',
                        width: 1000,
                        height: 'auto',
                        padding: 'auto',
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
    > 
                         <CardHeader sx={{textAlign:'left', padding:3}}
                                title={list.subject} 
                                subheader={list.content} />
                </Paper>))}
            </Paper> 
                
            <div className="bottom-div">
                <Stack spacing={2} sx={{display:'inline-block', marginTop:8}}>
                <Pagination count={totalPage} variant="outlined" shape="rounded" color='primary'
                                    page={cPage}
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