
import { Card,CardContent,CardMedia,CardActions,Typography,Button,Box,Stack} from "@mui/material";
import Grid from '@mui/material/Grid';
import { margin } from '@mui/system';
import Axios from 'axios';
import { useEffect, useState } from 'react';

export default function Main_Card(){


    //------------------------------비동기식 통신으로 램덤 자료 3개 받을 곳!----------------------
    const [list,setList] =useState([]);
    //------------------------------비동기식 통신으로 받아올 베스트 글 정보 저장할 곳 !  -------------------
    const [c_list,setC_list] = useState([
        {
            title:'오늘의 베스트 켐핑장',
            category:'자랑'
        },
        {
            title:'캠핑장에서 이렇게 먹었어요',
            category:'먹거리'
        },
        {
            title:'지역 특상품 : 가평 밤막걸리 짱! + 해장국 여기 대박이에요 !! 꼭',
            category:'먹거리'
        },
        {
            title:'땅끝마을에서 차박 했어요 !!!!',
            category:'자랑'
        },
        {
            title:'대박 강릉 닭강정 맛있어요 ~',
            category:'먹거리'
        },
        {
            title:'드라이브 중 발견한 안목해변 풍경',
            category:'추천'
        },
        {
            title:'이건 꼭 봐야함 안보면 ....',
            category:'자유'
        },
        {
            title:'어디갈까요 ? 투표 부탁드립니다 !! ',
            category:'자유'
        },
        {
            title:'이걸 안본다고 ??',
            category:'자유'
        },
        {
            title:'좋아요 눌러줘 이렇게 부탁할게',
            category:'자유'
        }
    ]);
        
    const API_URL ='https://apis.data.go.kr/B551011/GoCamping/searchList?serviceKey=wBQmzgiBACZ1O%2FJ79%2FmqTep2O%2BGJZiXE2%2BHacF5l2epi%2FT4f1uh270dxEAiIzwstnzWTF74b6C%2BRli%2BRL4UlTQ%3D%3D&numOfRows=3&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&keyword=%EC%95%BC%EC%98%81%EC%9E%A5'
    const API_URL2 = 'http://localhost8080/getList'
    function getData(){
        Axios.get(
            API_URL
        ).then((json)=>{
            setList(json.data.response.body.items.item);
        });
    }
/*
    function getList(){
        Axios.get(
            API_URL2
        ).then((json)=>{
            console.log(json);
        });
    }
*/

    useEffect(() => { 
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
                                                <Typography variant='body1'color='text.secondary' className="camtitle">
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
                            {c_list.map((item2) => (
                                <Grid container className="bbsbox" >
                                 <Grid item xs={3}>
                                     <Typography variant='body1' color='text.secondary' className="bbscategory">
                                    [{item2.category}]
                                      </Typography>
                                 </Grid>
                                 <Grid item xs={9}>
                                    <Typography variant='body1' color='text.secondary'className='bbstitle'>
                                      {item2.title}
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
                            {c_list.map((item2) => (
                                <Grid container className="bbsbox">
                                <Grid item xs={3}>
                                <Typography variant='body1' color='text.secondary' className="bbscategory">
                                    [{item2.category}]
                                 </Typography>
                                </Grid>
                               <Grid item xs={9}>
                                    <Typography variant='body1' color='text.secondary' className='bbstitle' >
                                      {item2.title}
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