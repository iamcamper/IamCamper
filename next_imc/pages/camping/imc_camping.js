
import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main_Bottom from "../../com/Main_Bottom";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import { Box, Container, Paper, FormControl, Stack, TextField, Button ,InputLabel,Select,MenuItem} from '@mui/material';

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
import { useEffect ,useState,useCallback } from 'react';
import Grid from '@mui/material/Grid';
import { borderRadius, width } from "@mui/system";
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
  const [camlist,setCamlist] = useState([]);
  const [ count , setCount] = useState();

    
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
        console.log(x+"/"+y);
        const options = { 
          center: new kakao.maps.LatLng(x, y), //검색 할 지역 위도 경도 
          level: 8
        };
        
        const map = new kakao.maps.Map(mapContainer, options); 
       //------------------------ 마커 ----------------------------- json 문서 반복문 마커 모양은 변경 예정
       if(camlist.length>0){
       camlist.map((vo)=>{
        const markerPosition = new kakao.maps.LatLng(vo.mapY, vo.mapX); 
        const marker = new kakao.maps.Marker({ 
          position: markerPosition
        }); 
        marker.setMap(map); 
       });
      }
        //------------------------ 마커 ----------------------------- 
      });   
    }); 
  }
  
  useEffect(() => { 
    addmap();
  },[]); 
//-------------------------지도-------------------------------------------------------

const [addr,setAddr] = useState('');
const [title,setTitle] = useState([list]);
var list =[""];

const category= ['서울','부산','대구','인천','광주','울산','경기','강원도','충청남도','경상북도','경상남도','전라북도','전라남도','제주','세종'];

const handleChange = (event) => {
    setAddr(event.target.value);
    //console.log(addr+'/'+title);
};

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
const [page, setPage] = React.useState(1);
const PageChange = (event, value) => {
    setPage(value);
    console.log(value);
  };

function getData(){
  Axios.post(
    "http://localhost:8080/cam/getData",null,
    { params: { "addr":addr, "category":value }}
    ).then((json)=>{
      console.log(json.data.vo.length);
      setCamlist(json.data.vo);
      setCount(Math.ceil(json.data.vo.length/3));
    }).catch((Error)=>{
    });
}

const [value, setValue] = React.useState(0);
const getCategory = (event, newValue) => {
        setValue(newValue);
        console.log(value);
 };
    return(
      <>
    
    <div className={styles.container}>
      

      <Main1_top/>
      <Main1/>
      <Main1_Menu/>
      <Box  div style={{width:'1600px', margin:'0 auto' ,height:"500px"}}>
        <Grid container  style={{textAlign:'center'}}>
          <Grid item xs style={{height:"500px"}}>
              <div style={{margin:'0 auto',height:'1200px'}}>
                <div id="map" className="map" style={{
                    width: "600px",
                    height: "500px",
                    alignItems: "center",
                    justifyContent: "center",
                    margin:"auto",
                    borderRadius:"10px"
                  }}/>
              </div>
            </Grid>
            <Grid  item xs style={{height:"500px"}}>
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
                       {category.map((item) => (  
                          <MenuItem value={item}>{item}</MenuItem>          
                        ))}
                    </Select>
                  </FormControl> 
                  <BottomNavigation style={{ width: "500px",margin:"0 auto" ,marginTop:"20px"}} value={value} onChange={getCategory}>
                    <BottomNavigationAction
                      label="전체보기"
                      value="전체보기"
                      icon={<FitScreenIcon  />}
                    />
                    <BottomNavigationAction
                      label="애완동물"
                      value="애완동물"
                      icon={<PetsSharpIcon  />}
                    />
                    <BottomNavigationAction
                      label="카라반"
                      value="카라반"
                      icon={<AirportShuttleIcon  />}
                    />
                    <BottomNavigationAction 
                      label="자동차" 
                      value="자동차" 
                      icon={<DriveEtaIcon  />} />
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
                      label="병원"
                      value="병원"
                      icon={<MedicalServicesIcon  />}
                    />
                    <BottomNavigationAction 
                      label="약국" 
                      value="약국" 
                      icon={<MedicationIcon  />} />
                  </BottomNavigation> 
                  <Button variant="contained" style={{width:'100%',height:"100%"}} onClick={getData} ><span onClick={addmap()} >go Camping</span></Button>  
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
              {camlist.map((item,index)=>(
              <TableRow>
                
              <TableCell style={{height:"250px"}}> 
                  <div style={{width:"300px",height:"200px",margin:"auto"}}> 

                  <img 
                    src={item.image}
                    style={{width:"300px",height:"200px"}}
                  />
                </div>             
              </TableCell>
              <TableCell styles={{heigth:"250px"}}>
                <div>
                  <span style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>업체명 : </span>
                  <span style={{display:"inline-block",height:"60px",width:"40%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>{item.title}</span>
                  <span style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>카테고리 : </span>
                  <span style={{display:"inline-block",height:"60px",width:"40%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>{item.category}</span>    
                </div>
                <div>
                  <span style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>주소 :</span>
                  <span style={{display:"inline-block",height:"60px",width:"90%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>{item.addr}</span>
                </div>

                {item.tel !== null?
                <div>
                  <span style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>전화번호 :</span>
                  <span style={{display:"inline-block",height:"60px",width:"90%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>{item.tel}</span>
                </div>
                  :
                <div>
                  <span style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>전화번호 :</span>
                  <span style={{display:"inline-block",height:"60px",width:"90%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>없음</span>
                </div>
                }
                <div>
                  <span style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>예약방법 :</span>
                  <span style={{display:"inline-block",height:"60px",width:"90%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>{item.manner}</span>
                </div>
                <div>
                  <span style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>애완동물 :</span>
                  <span style={{display:"inline-block",height:"60px",width:"90%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>{item.animal}</span>
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
    <Main_Bottom />

    </>
    );
}