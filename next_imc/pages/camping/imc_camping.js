
import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main_Bottom from "../../com/Main_Bottom";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import { Box, Container, Paper, FormControl, Stack, TextField, Button } from '@mui/material';
import { useEffect } from 'react';


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
      console.log('script loaded!!!');  
      const kakao = window['kakao']; 
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = { 
          center: new kakao.maps.LatLng(37.56000302825312, 126.97540593203321), 
          level: 3 
        }; 
        const map = new kakao.maps.Map(mapContainer, options); 
        
        const markerPosition = new kakao.maps.LatLng(37.56000302825312, 126.97540593203321); 
        const marker = new kakao.maps.Marker({ 
          position: markerPosition
        }); 
        marker.setMap(map); 
      });   
    }); 
  }, []);

//-------------------------지도 끝-------------------------------------------------------
    return(
    
    <div className={styles.container}>
      

      <Main1_top/>
      <Main1/>
      <Main1_Menu/>

      <div >
        <div style={{width:'1600px', margin:'0 auto',height:'1200px'}}>
          <div id="map" className="map" style={{
              width: "600px",
              height: "400px",
              alignitems: "center",
              justifycontent: "center",
              marginleft: "auto",
              marginright: "auto",
              borderstyle: "solid",
              borderwidth: "medium",
              bordercolor: "#D8D8D8",
            }}/>
        </div>
      </div>

      <Main_Bottom/>

    </div>
    );
}