
import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main_Bottom from "../../com/Main_Bottom";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import { Box, Container, Paper, FormControl, Stack, TextField, Button ,InputLabel,Select,MenuItem, Link} from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//-----------------------

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';



import Typography from '@mui/material/Typography';
import Axios from "axios";
import { useEffect ,useState } from 'react';
import Grid from '@mui/material/Grid';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MedicationIcon from '@mui/icons-material/Medication';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import PetsSharpIcon from '@mui/icons-material/PetsSharp';
import WarehouseSharpIcon from '@mui/icons-material/WarehouseSharp';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import Pagination from '@mui/material/Pagination';
import { request } from "http";
//-------------------------import ---------------------------
export default function imc_camping(){

  //변수 ---------------------------------------------
  const [camlist,setCamlist] = useState([]); //캠핑장 데이터
  const [plist,setPlist] = useState([]); // 캠핑장 소개 리스트
  const [ count , setCount] = useState();  // 데이터 수
  const [addr,setAddr] = useState(null);//검색 지역
  const category= ['서울','부산','대구','인천','광주','울산','경기','강원도','충청남도','경상북도','경상남도','전라북도','전라남도','제주','세종']; //지역 
  const [page, setPage] = useState(1); //cPage
  const [value, setValue] = useState(null); //검색 카테고리

//-------------------------지도-------------------------------------------------------
  const new_script = src => { 
    return new Promise((resolve, reject) => { 
      const script = document.createElement('script'); 
      script.src = src; 
      script.addEventListener('load', () => { 
        resolve(); 
      }); 
      script.addEventListener('error', e => { 
        reject(e); 
      }); 
      document.head.appendChild(script); 
    }); 
  };

  

  function addmap(){
    const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0aab4ae4cc3b82635b466ffbc21012b3');

    my_script.then(() => { 
      const kakao = window['kakao']; 
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        
        var x = 37.56000302825312;
        var y = 126.97550593203321;
      
        if(camlist.length > 0){
          x = camlist[0].mapY;
          y = camlist[0].mapX;
        } 
        const options = { 
          center: new kakao.maps.LatLng(x, y), //검색 할 지역 위도 경도 
          level: 12
        };
        
        const map = new kakao.maps.Map(mapContainer, options); 
       //------------------------ 마커 ----------------------------- json 문서 반복문 마커 모양은 변경 예정
       if(camlist.length>0){
       camlist.map((vo)=>{
        var marker = new kakao.maps.Marker({
          map: map, 
          position: new kakao.maps.LatLng(vo.mapY , vo.mapX)
      });
      
      var content = '<div class="wrap">' +'<div class="info">' + '<div class="title">' + vo.title + '</div>' + 
                  '<div class="body">' + '<div class="img">' +' <img src="'+vo.image+ '" width="73" height="70">' +
                  '</div>' + '<div class="desc">' + '<div class="ellipsis">'+ vo.addr +'</div>' + 
                  '<div><a href='+vo.page +'target="_blank" class="link">홈페이지</a></div>' + 
                  '</div>' + 
                  '</div>' + 
                  '</div>' +    
                  '</div>';

      var overlay = new kakao.maps.CustomOverlay({
          content: content,
          map: map,
          position: marker.getPosition()       
      });

      kakao.maps.event.addListener(marker, 'click', function() {
          overlay.setMap(map);
      });
       });
      }
        //------------------------ 마커 ----------------------------- 
      });   
    }); 
  }
  // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 

  useEffect(() => { 
    addmap();
  },[]); 
//-------------------------지도-------------------------------------------------------

//지역 변경 함수
const handleChange = (event) => {
    setAddr(event.target.value);
};

//삭제 예정
function setTag (name) {
  var chk = true;
  var i = 0;
  list.forEach(element => {

      if(element == name){
        chk=false;
        list.slice(i,1);
      }
      i++;
  });
  if(chk){
    list.push(name);
  }
  list.forEach(element => {
    console.log(element);
});

  
};

//페이지 변경 시 사용하는 함수
const PageChange = (event, value) => {
  setPage(value);
  getData(value);
  };

  useEffect(()=>{},[page]);


//데이터 검색 하는 함수
function getData(cPage){
  if(addr == null){
    alert("지역을 선택해 주세요!");
  }
  if(value==null){
    alert("카테고리를 선택해 주세요!");
  }

  if(addr!=null && value != null){
    Axios.post(
      "/cam/getData",null,
      { params: { "addr":addr, "category":value ,"cPage":cPage}}
      ).then((json)=>{
        setCamlist(json.data.vo);
        setCount(Math.ceil(json.data.vo.length/3));
        setPlist(json.data.pvo)
      }).catch((Error)=>{});
  }
}
//카테고리 변경 함수
const getCategory = (event, newValue) => {
        setValue(newValue);
        console.log(value);
 };


 //---------------------------------------
    return(
      <>
    
    <div className={styles.container}>
      
    
      <Main1_top/>
      <Main1/>
      <Main1_Menu/>
      <Box  div style={{width:'1600px', margin:'0 auto' ,height:"500px"}}>
        <Grid container  style={{textAlign:'center'}}>
          <Grid item xs style={{height:"500px"}} >
              <div style={{margin:'0 auto',height:'1200px'}}>
                <div id="map" className="map" style={{
                    width: "700px",
                    height: "500px",
                    alignItems: "center",
                    justifyContent: "center",
                    margin:"auto",
                    borderRadius:"10px"
                  }}/>
              </div>
            </Grid>
            <Grid  item xs style={{height:"500px"}} >
              <div style={{position:'relative'}}>
                <div style={{position:'absolute',left:'170px',top:'70px' ,width:'500px',height:'60px'}}>
                  <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">찾을 지역</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={addr}
                      label="찾을지역"
                      onChange={handleChange}
                    >
                       {category.map((item,index) => (  
                          <MenuItem value={item} key={index}>{item}</MenuItem>          
                        ))}
                    </Select>
                  </FormControl> 
                  <BottomNavigation style={{ width: "500px",margin:"0 auto" ,marginTop:"20px"}} value={value} onChange={getCategory}>
                    <BottomNavigationAction
                      label="전체보기"
                      value="전체보기"
                      icon={<FitScreenIcon/>}
                    />
                    <BottomNavigationAction
                      label="애완동물"
                      value="애완동물"
                      icon={<PetsSharpIcon/>}
                    />
                    <BottomNavigationAction
                      label="카라반"
                      value="카라반"
                      icon={<AirportShuttleIcon  />}
                    />   
                  </BottomNavigation>
                  <BottomNavigation style={{ width: "500px",marginTop:"10px",marginBottom:"20px" }} value={value} onChange={getCategory}>
                    <BottomNavigationAction
                      label="글램핑"
                      value="글램핑"
                      icon={<WarehouseSharpIcon  />}
                    />
                    <BottomNavigationAction
                      label="야영장"
                      value="야영장"
                      icon={<LocalFireDepartmentIcon  />}
                    />
                    <BottomNavigationAction 
                      label="자동차" 
                      value="자동차" 
                      icon={<DriveEtaIcon  />} />

                  </BottomNavigation> 
                  <Button variant="contained" style={{width:'100%',height:"100%"}} onClick={(e)=>{getData(1)}} ><span onClick={addmap()}>go Camping</span></Button> 

                </div>
              </div>
            </Grid>
          </Grid>
      </Box>
      
      <Box  div style={{width:'1600px', margin:'0 auto' ,height:"900px" ,marginTop:'30px'}}>
        <Grid container  style={{textAlign:'center'}}>
          <Table sx={{ width:"1400px",margin:"0 auto" }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow >
                <TableCell style={{width:"30%",textAlign:"center" }}>이미지</TableCell>
                <TableCell style={{width:"70%" ,textAlign:"center"}} >소개</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                
                {plist.map((item,index)=>(
                <TableRow key={index}>
                  <TableCell style={{height:"250px"}} key={index}> 
                      <div style={{width:"300px",height:"200px",margin:"auto"}} key={index}> 

                      <img 
                        key={index}
                        src={item.image}
                        style={{width:"300px",height:"200px"}}
                      />
                    </div>             
                  </TableCell>
                  <TableCell styles={{heigth:"250px"}} key={index}>
                    <div style={{borderBottom:"1px solid #dcdcdc"}} key={index}>
                      <span key={index} style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px"}}>업체명 : </span>
                      <span key={index} style={{display:"inline-block",height:"60px",width:"40%",paddingTop:'20px',fontSize:"15px"}}>{item.title}</span>
                      <span key={index} style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',fontSize:"15px"}}>카테고리 : </span>
                      <span key={index} style={{display:"inline-block",height:"60px",width:"40%",paddingTop:'20px',fontSize:"15px"}}>{item.category}</span>    
                    </div>
                    <div style={{borderBottom:"1px solid #dcdcdc"}} key={index}>
                      <span key={index} style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',fontSize:"15px"}}>주소 :</span>
                      <span key={index} style={{display:"inline-block",height:"60px",width:"90%",paddingTop:'20px',fontSize:"15px"}}>{item.addr}</span>
                    </div>
                    <div style={{borderBottom:"1px solid #dcdcdc"}} key={index}>
                    <span key={index} style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',fontSize:"15px"}}>전화번호 : </span>
                      <span key={index} style={{display:"inline-block",height:"60px",width:"40%",paddingTop:'20px',fontSize:"15px"}}>{item.tel}</span>
                      <span key={index} style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',fontSize:"15px"}}>예약방법 : </span>
                      <span key={index} style={{display:"inline-block",height:"60px",width:"40%",paddingTop:'20px',fontSize:"15px"}}>{item.manner}</span> 
                    </div>
                    <div style={{borderBottom:"1px solid #dcdcdc"}} key={index}>
                      <span key={index} style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',fontSize:"15px"}}>애완동물 : </span>
                      <span key={index} style={{display:"inline-block",height:"60px",width:"40%",paddingTop:'20px',fontSize:"15px"}}>{item.animal}</span>
                      <span key={index} style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',fontSize:"15px"}}>홈페이지 : </span>
                      <span key={index} style={{display:"inline-block",height:"60px",width:"40%",paddingTop:'20px',fontSize:"15px"}}>
                        <Button key={index} variant="text" style={{width:'150px',height:"80%",color:"black",border:"1px solid gray"}}  onClick={() => window.open(item.page, '_blank')}>페이지 이동</Button>
                      </span>   
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              
              <TableRow >
                <TableCell colSpan={2} style={{padding:"0 auto"}}>
                <Stack spacing={2}>
                  <Pagination count={count} page={page} onChange={PageChange} style={{padding:"auto"}} />
                </Stack>
                </TableCell>
              </TableRow>
              </TableBody>
          </Table>             
          </Grid>
      </Box>
    </div>

    </>
    );
}