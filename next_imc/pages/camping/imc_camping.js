
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


import { useEffect ,useState} from 'react';
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
import { INTERNALS } from "next/dist/server/web/spec-extension/request";
//-------------------------import ---------------------------
export default function imc_camping(){
  const [camlist,setCamlist] = useState([
    {
      title:"xx캠핑장",
      image:"https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEwMzBfMTUx%2FMDAxNjY3MTE4Mjc4NzM2.w-t-3vX19TkE1gS6nF1mtokVrGMg2LMCUlOog40ra3cg.m4LSUKD5SgHD2x5QOnYXJ1VZe41q_DbpxUI38GUACdgg.JPEG.bbaltae%2F1667118265169.jpg&type=l340_165",
      category:"야영장",
      mapX:"35.9840344",
      mapY:"129.0005945",
      explain:"야영이 가능한 캠핑장",
      minutely:"자세한 설명",
      facilities: "편의점",
      manner: "전화,온라인",
      animal:"가능",
      tel:"010-0000-0000",
      page:"http://increpas.com",
      addr:"서울 어딘가"
    },
    {
      title:"xx캠핑장",
      image:"https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEwMzBfMTUx%2FMDAxNjY3MTE4Mjc4NzM2.w-t-3vX19TkE1gS6nF1mtokVrGMg2LMCUlOog40ra3cg.m4LSUKD5SgHD2x5QOnYXJ1VZe41q_DbpxUI38GUACdgg.JPEG.bbaltae%2F1667118265169.jpg&type=l340_165",
      category:"야영장",
      mapX:"36.5017433",
      mapY:"127.0207700",
      explain:"야영이 가능한 캠핑장",
      minutely:"자세한 설명",
      facilities: "편의점",
      manner: "전화,온라인",
      animal:"가능",
      tel:"010-0000-0000",
      page:"http://increpas.com",
      addr:"서울 어딘가"
    },
    {
      title:"xx캠핑장",
      category:"야영장",
      mapX:"36.0300417",
      mapY:"128.6304762",
      explain:"야영이 가능한 캠핑장",
      minutely:"자세한 설명",
      facilities: "편의점",
      manner: "전화,온라인",
      animal:"가능",
      tel:"010-0000-0000",
      page:"http://increpas.com",
      addr:"서울 어딘가"
    }
  
  ]);

  
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
  
  useEffect(() => { 
    
    const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0aab4ae4cc3b82635b466ffbc21012b3');
    
   
    my_script.then(() => { 
      const kakao = window['kakao']; 
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = { 
          center: new kakao.maps.LatLng(37.56000302825312, 126.97550593203321), //검색 할 지역 위도 경도 
          level: 8
        }; 
        const map = new kakao.maps.Map(mapContainer, options); 
       //------------------------ 마커 ----------------------------- json 문서 반복문 마커 모양은 변경 예정
        const markerPosition = new kakao.maps.LatLng(37.56000302825312, 126.97550593203321); 
        const markerPosition2 = new kakao.maps.LatLng(37.50000302825312, 126.97050593203321); 
        const marker = new kakao.maps.Marker({ 
          position: markerPosition
        }); 

        const marker2 = new kakao.maps.Marker({ 
          position: markerPosition2
        }); 
        marker.setMap(map); 
        marker2.setMap(map);
        //------------------------ 마커 ----------------------------- 
      });   
    }); 
  }, []);

//-------------------------지도-------------------------------------------------------

const [addr,setAddr] = useState('');
const [title,setTitle] = useState([list]);
var list =[""];

const category= ['서울특별시','부산광역시','대구광역시','인청광역시','광주광역시','울산','경기도','강원도','충청남도','경상북도','경상남도','전라북도','전라남도','제주','세종특별자치시 '];

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
function setId(e){

}



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
                <div style={{position:'absolute',left:'170px',top:'70px' ,width:'370px',height:'60px'}}>
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
                </div>
                  <div style={{top:'150px',left:'170px'}} className='icons' onClick={() => {setTag("");}} >  
                    <FitScreenIcon className='icon' onClick={setId}/>
                    <span className="name">전체 보기</span>
                  </div>
                  <div style={{top:'150px',left:'270px'}} className='icons' onClick={() => setTag("애완동물")}>
                    <PetsSharpIcon className='icon' onClick={setId}/>
                  <span className="name">애완동물</span>
                  </div>
                  <div style={{top:'150px',left:'370px'}}className='icons' onClick={() => setTag("카라반")}>
                    <AirportShuttleIcon className='icon' onClick={setId}/>
                  <span className="name">카라반</span>
                  </div>
                  <div style={{top:'150px',left:'470px'}} className='icons'onClick={() => setTag("자동차")}>
                    <DriveEtaIcon className='icon' onClick={setId}/>
                  <span className="name">자동차</span>
                  </div>
                  <div style={{top:'250px',left:'170px'}}className='icons' onClick={() => setTag("글램핑")}>
                    <WarehouseSharpIcon className='icon' onClick={setId}/>
                  <span className="name">글램핑</span>
                  </div>
                  <div style={{top:'250px',left:'270px'}}className='icons' onClick={() => setTag("야영장")}>
                    <LocalFireDepartmentIcon className='icon' onClick={setId}/>
                  <span className="name">야영장</span>
                  </div>
                  <div style={{top:'250px',left:'370px'}}className='icons' onClick={() => setTag("병원")}>
                    <MedicalServicesIcon className='icon' onClick={setId}/>
                  <span className="name">병원</span>
                  </div>
                  <div style={{top:'250px',left:'470px'}}className='icons' onClick={() => setTag("약국")}>
                   <MedicationIcon className='icon' onClick={setId}/>
                  <span className="name">약국</span>
                  </div>
                  <div style={{position:'absolute',left:'170px',top:'360px' ,width:'370px',height:'60px'}}>
                    <Button variant="contained" style={{width:'100%',height:"100%"}} >go Camping</Button>
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
                      src={item.image !=null  ? item.image:"http://www.increpas.com/images/main_img3.jpg"}
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
                  <div>
                    <span style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>전화번호 :</span>
                    <span style={{display:"inline-block",height:"60px",width:"90%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>{item.tel}</span>
                  </div>
                  <div>
                    <span style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>예약방법 :</span>
                    <span style={{display:"inline-block",height:"60px",width:"90%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>{item.manner}</span>
                  </div>
                  {item.animal != null?
                  <div>
                    <span style={{display:"inline-block",height:"60px",width:"10%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>애완동물 :</span>
                    <span style={{display:"inline-block",height:"60px",width:"90%",paddingTop:'20px',paddingBottom:'20px',fontSize:"15px",borderBottom:"1px solid #dcdcdc"}}>{item.animal}</span>
                  </div>
                  :없음  
                }
                </TableCell>
              </TableRow>

              ))}

              
              <TableRow >
                <TableCell colSpan={2}>
                  <div>
                    <Stack spacing={2}  >
                      <Pagination count={10} />
                    </Stack>
                  </div>
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