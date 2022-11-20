
import { Card,CardContent,CardMedia,CardActions,Typography,Button,Box,Stack} from "@mui/material";
import Grid from '@mui/material/Grid';
import { margin } from '@mui/system';

export default function Main_Card(){

    return(
        <div style={{width:'1600px', height:'600px',margin:'auto' , marginBottom:'50px'}}> 
            <Stack spacing={25} direction='row'>
                <Grid container>
                    
                    <Grid item xs>
                        <Box style={{width:'100%',height:'100%',marginTop:'30px',padding:'20px'}}>
                                    <Typography variant='h5' component='div' textAlign='left' marginBottom='20px'>
                                    오늘의 추천 Pick
                                    </Typography>
                                    <Grid container marginTop='10px' borderBottom="1px solid #d3d3d3" paddingBottom='10px'>
                                        <Grid item xs={4}>
                                            <CardMedia 
                                            component='img'
                                            height='130px'
                                            image="https://lh5.googleusercontent.com/p/AF1QipMh9j3Cy1yTBEepq12cGC3HU2hqgrpUOxaTV5kK=w114-h114-n-k-no"
                                            alt='unsplash image'
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                            서울대공원 캠핑장
                                            </Typography>
                                            <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                            경기도 과천시 막계동 산59-2
                                            </Typography>
                                            <CardActions>
                                                <Button size="small"> 자세히 보기</Button>
                                            </CardActions>
                                        </Grid>
                                    </Grid>
                                    <Grid container marginTop='10px' borderBottom="1px solid #d3d3d3" paddingBottom='10px'>
                                        <Grid item xs={4}>
                                            <CardMedia 
                                            component='img'
                                            height='130px'
                                            image="https://lh5.googleusercontent.com/p/AF1QipMAy0GhZ4gaZtsZeWvoLsSta_f_4q1_IGy5Tuac=w114-h114-n-k-no"
                                            alt='unsplash image'
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                            도덕산캠핑장
                                            </Typography>
                                            <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                            경기도 광명시 밤일안로42번길 69
                                            </Typography>
                                            <CardActions>
                                                <Button size="small"> 자세히 보기</Button>
                                            </CardActions>
                                        </Grid>
                                    </Grid>
                                    <Grid container marginTop='10px' borderBottom="1px solid #d3d3d3" paddingBottom='10px'>    
                                        <Grid item xs={4}>
                                            <CardMedia 
                                            component='img'
                                            height='130px'
                                            image="https://lh5.googleusercontent.com/p/AF1QipO2dqRNuHBgj0qlSE5Y6Sr2JO-wlWxbLSEjUpWf=w114-h114-n-k-no"
                                            alt='unsplash image'
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                            강원도 용용캠핑장
                                            </Typography>
                                            <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                            강원도 강릉시 강릉대로 33
                                            </Typography>
                                            <CardActions>
                                                <Button size="small"> 자세히 보기</Button>
                                            </CardActions>
                                        </Grid>
                                    </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box style={{width:'100%',height:'100%',marginTop:'30px',padding:'20px'}}>
                                    <Typography variant='h5' component='div' textAlign='left' marginBottom='10px'>
                                    I am Camper 중고거래
                                    </Typography>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       클릭 시 해당 글 보기로 이동 ! 
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box style={{width:'100%',height:'100%',marginTop:'30px',padding:'20px'}}>
                                    <Typography variant='h5' component='div' textAlign='left' marginBottom='10px'>
                                    I am Camper 오늘의 화제
                                    </Typography>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     클릭 시 해당 글 보기로 이동 ! 
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container marginTop='5px' borderBottom="1px solid #d3d3d3" paddingBottom='5px'>
                                 <Grid item xs={3}>
                                 <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                     [카테고리]
                                  </Typography>
                                 </Grid>
                                <Grid item xs={9}>
                                     <Typography variant='body1' color='text.secondary' textAlign='left' marginTop='10px' marginLeft='10px'>
                                       강원도 용용캠핑장 대박 후기!! 꼭 보세요
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </div>
    );
}