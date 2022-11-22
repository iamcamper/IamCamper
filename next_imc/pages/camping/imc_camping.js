
import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main_Bottom from "../../com/Main_Bottom";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import { Box, Container, Paper, FormControl, Stack, TextField, Button ,InputLabel,Select,MenuItem} from '@mui/material';
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

export default function imc_camping(){
  
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
const [title,setTitle] = useState('');
const category= ['서울특별시','부산광역시','대구광역시','인청광역시','광주광역시','울산','경기도','강원도','충청남도','경상북도','경상남도','전라북도','전라남도','제주','세종특별자치시 '];

const handleChange = (event) => {
    setAddr(event.target.value);
    console.log(addr+'/'+title);
};

function setTag (name) {
  setTitle(name);
  console.log(addr+'/'+title);
};
    return(
    
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
              

                  <div style={{top:'150px',left:'170px'}} className='icons' onClick={() => setTag("야영")} >  
                    <LocalFireDepartmentIcon className='icon' />
                    <span className="name">야영장</span>
                  </div>
                  <div style={{top:'150px',left:'270px'}} className='icons' onClick={() => setTag("애완동물")}>
                    <PetsSharpIcon className='icon'/>
                  <span className="name">애완동물</span>
                  </div>
                  <div style={{top:'150px',left:'370px'}} className='icons' onClick={() => setTag("자동차")}>
                    <AirportShuttleIcon className='icon'/>
                  <span className="name">자동차</span>
                  </div>
                  <div style={{top:'150px',left:'470px'}}className='icons' onClick={() => setTag("카라반")}>
                    <DriveEtaIcon className='icon'/>
                  <span className="name">카라반</span>
                  </div>
                  <div style={{top:'250px',left:'170px'}}className='icons' onClick={() => setTag("글램핑")}>
                    <WarehouseSharpIcon className='icon'/>
                  <span className="name">글램핑</span>
                  </div>
                  <div style={{top:'250px',left:'270px'}}className='icons' onClick={() => setTag("애완동물")}>
                    <DriveEtaIcon className='icon'/>
                  <span className="name">애완동물</span>
                  </div>
                  <div style={{top:'250px',left:'370px'}}className='icons' onClick={() => setTag("병원")}>
                    <MedicalServicesIcon className='icon'/>
                  <span className="name">병원</span>
                  </div>
                  <div style={{top:'250px',left:'470px'}}className='icons' onClick={() => setTag("약국")}>
                   <MedicationIcon className='icon'/>
                  <span className="name">약국</span>
                  </div>
                  <div style={{position:'absolute',left:'170px',top:'360px' ,width:'370px',height:'60px'}}>
                    <Button variant="contained" style={{width:'100%',height:"100%"}} >go Camping</Button>
                  </div>
              </div>

              
            
            </Grid>
          </Grid>
      </Box>
      
      <Box  div style={{width:'1600px', margin:'0 auto' ,height:"800px"}}>
        <Grid container  style={{textAlign:'center'}}>
            <Grid  item xs style={{border:"1px solid #D8D8D8",height:"800px"}}>미리보기 영역 및 페이징 기법</Grid>
          </Grid>
      </Box>
          
        
      <Main_Bottom/>

    <span className="name">애완동물</span>
    </div>
    );
}