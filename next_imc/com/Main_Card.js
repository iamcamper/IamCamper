
import { Card,CardContent,CardMedia,CardActions,Typography,Button,Box,Stack} from "@mui/material";
import Grid from '@mui/material/Grid';
import { margin } from '@mui/system';
import Axios from 'axios';
import { useEffect, useState } from 'react';

export default function Main_Card(){


    //------------------------------비동기식 통신으로 램덤 자료 3개 받을 곳!----------------------
    const [list,setList] =useState([]);
        
    const API_URL ='https://apis.data.go.kr/B551011/GoCamping/searchList?serviceKey=wBQmzgiBACZ1O%2FJ79%2FmqTep2O%2BGJZiXE2%2BHacF5l2epi%2FT4f1uh270dxEAiIzwstnzWTF74b6C%2BRli%2BRL4UlTQ%3D%3D&numOfRows=3&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&keyword=야영'
    
    function getData(){
        Axios.get(
            API_URL
        ).then((json)=>{
            setList(json.data.response.body.items.item);
        });
    }
  
    const API_URL2 = "http://localhost:8080/bbs/blist";
    
    const [blist,setBlist] = useState([]);
    const [ulist,setUlist] = useState([]);
    
    function getBlist(){
        Axios.get(
            API_URL2
        ).then((json)=>{
            console.log(json.data);
            if(json.data.blist != null){
                setBlist(json.data.blist);
                setUlist(json.data.ulist);
            }else if(json.data.blist == null){
                setBlist(
                    [{
                        subject:'데이터가 없습니다',
                        bname:'null'
                    }]
                );
                setUlist(
                    [{
                        subject:'데이터가 없습니다',
                        bname:'null'
                    }]
                );
            }
           
        });
    }


    useEffect(() => { 
        getBlist();
        getData();

    },[]);

    //-------------------------------------
   


    return(
        <div style={{width:'1600px', height:'600px',margin:'auto' , marginBottom:'50px'}}> 

            
            <Stack spacing={25} direction='row'>
                <Grid container>
                    <Grid item xs>
                        <Box className="box">
                                    <Typography variant='h5' component='div' textAlign='left' marginBottom='20px'>
                                    오늘의 추천 Pick
                                    </Typography>
                                    {list.map((item) => (
                                         <Grid container marginTop='10px' borderBottom="1px solid #d3d3d3" paddingBottom='10px'>
                                             <Grid item xs={4}>
                                                 <CardMedia 
                                                     component='img'
                                                     height='130px'
                                                     image={item.firstImageUrl}
                                                     alt='unsplash image'
                                               />
                                             </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant='body1'color='text.secondary' className="camtitle   ">
                                                       {item.facltNm}
                                                </Typography>
                                                <Typography variant='body1'color='text.secondary' className="camtitle" >
                                                    {item.addr1}
                                                </Typography>
                                                <CardActions>
                                                <Button size="small"> 자세히 보기</Button>
                                                </CardActions>
                                            </Grid>
                                        </Grid>     
                                        
                                    ))}
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box className="box">
                                    <Typography variant='h5' component='div' textAlign='left' marginBottom='10px'>
                                    I am Camper 중고거래
                                    </Typography>
                            {ulist.map((item) => (
                                <Grid container className="bbsbox" >
                                 <Grid item xs={3}>
                                     <Typography variant='body1' color='text.secondary' className="bbscategory">
                                     [{item.bname ==="USED"?"중고거래":"오류"}]
                                      </Typography>
                                 </Grid>
                                 <Grid item xs={9}>
                                    <Typography variant='body1' color='text.secondary'className='bbstitle'>
                                    {item.subject}
                                   </Typography>
                                 </Grid>
                                </Grid>       
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box className="box">
                                    <Typography variant='h5' component='div' textAlign='left' marginBottom='10px'>
                                    I am Camper 오늘의 화제
                                    </Typography> 
                            {blist.map((item) => (
                                <Grid container className="bbsbox">
                                <Grid item xs={3}>
                                <Typography variant='body1' color='text.secondary' className="bbscategory">
                                    [{item.bname ==="BBS"?"자유게시판":"오류"}]
                                 </Typography>
                                </Grid>
                               <Grid item xs={9}>
                                    <Typography variant='body1' color='text.secondary' className='bbstitle' >
                                      {item.subject}
                                   </Typography>
                               </Grid>
                           </Grid>       
                                    ))}

                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </div>
    );
}