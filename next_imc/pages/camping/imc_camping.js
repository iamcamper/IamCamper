
import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main_Bottom from "../../com/Main_Bottom";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import { Box, Container, Paper, FormControl, Stack, TextField, Button } from '@mui/material';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';

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
          center: new kakao.maps.LatLng(37.56000302825312, 126.97540593203321), //검색 할 지역 위도 경도 
          level: 8
        }; 
        const map = new kakao.maps.Map(mapContainer, options); 
       //------------------------ 마커 ----------------------------- json 문서 반복문 마커 모양은 변경 예정
        const markerPosition = new kakao.maps.LatLng(37.56000302825312, 126.97540593203321); 
        const markerPosition2 = new kakao.maps.LatLng(37.50000302825312, 126.97040593203321); 
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
    return(
    
    <div className={styles.container}>
      

      <Main1_top/>
      <Main1/>
      <Main1_Menu/>

      <Box  div style={{width:'1600px', margin:'0 auto' ,height:"500px"}}>
        <Grid container  style={{textAlign:'center'}}>
          <Grid item xs style={{border:"1px solid #D8D8D8",height:"500px"}}>
              <div style={{margin:'0 auto',height:'1200px'}}>
                <div id="map" className="map" style={{
                    width: "600px",
                    height: "400px",
                    alignItems: "center",
                    justifyContent: "center",
                    margin:"auto",
                    borderStyle: "solid",
                    borderWidth: "medium",
                    borderColor: "#D8D8D8",
                  }}/>
              </div>
            </Grid>
            <Grid  item xs style={{border:"1px solid #D8D8D8",height:"500px"}}>버튼 영역 및 검색기능</Grid>
          </Grid>
      </Box>
      
      <Box  div style={{width:'1600px', margin:'0 auto' ,height:"800px"}}>
        <Grid container  style={{textAlign:'center'}}>
            <Grid  item xs style={{border:"1px solid #D8D8D8",height:"800px"}}>미리보기 영역 및 페이징 기법</Grid>
          </Grid>
      </Box>
  
        
      <Main_Bottom/>

    </div>
    );
}