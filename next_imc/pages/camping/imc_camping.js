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
      if(vo.image.length>0){
        var content = '<div class="wrap">' +'<div class="info">' + '<div class="title">' + vo.title + '</div>' + 
                    '<div class="body">' + '<div class="img">' +' <img src="'+vo.image+ '" width="73" height="70">' +
                    '</div>' + '<div class="desc">' + '<div class="ellipsis">'+ vo.addr +'</div>' + 
                    '<div><a href='+vo.page+'class="link">홈페이지</a></div>' + 
                    '</div>' + 
                    '</div>' + 
                    '</div>' +    
                    '</div>';
      }else{
        var content = '<div class="wrap">' +'<div class="info">' + '<div class="title">' + vo.title + '</div>' + 
                    '<div class="body">' + '<div class="img">' +' <img src="'+"data:image/png;base64,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"+ '" width="73" height="70">' +
                    '</div>' + '<div class="desc">' + '<div class="ellipsis">'+ vo.addr +'</div>' + 
                    '<div><a href='+vo.page+'class="link">홈페이지</a></div>' + 
                    '</div>' + 
                    '</div>' + 
                    '</div>' +    
                    '</div>';

      }

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


//페이지 변경 시 사용하는 함수
const PageChange = (event, value) => {
  setPage(value);
  getPdata(value);
  };

  useEffect(()=>{},[page]);

  function getPdata(cpage){
    if(addr == null){
      alert("지역을 선택해 주세요!");
    }
    if(value==null){
      alert("카테고리를 선택해 주세요!");
    }
  
    if(addr!=null && value != null){
      Axios.post(
        "/cam/getPdata",null,
        { params: { "addr":addr, "category":value ,"cPage":cpage}}
        ).then((json)=>{
          setPlist(json.data.pvo);
        }).catch((Error)=>{});
    }
  }


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

        if(json.data.vo != null){
          setCamlist(json.data.vo);
          setCount(Math.ceil(json.data.vo.length/3));
          setPlist(json.data.pvo)
          setPage(cPage);
        }else{
          alert("검색되는 데이터가 없습니다");
        }
      }).catch((Error)=>{
        alert("검색된 자료가 없습니다!")
      });
  }
}
//카테고리 변경 함수
const getCategory = (event, newValue) => {
        setValue(newValue);
 };

 const [name, setName] = useState();
 function search(e){
  setName(e.target.value);
  console.log(e.target.value);
}

function search2(){
  if(name != null){
    Axios.post(
      "/cam/Search",null,
      { params: {"title":name}}
      ).then((json)=>{
        if(json.data.vo !=null){
          setCamlist(json.data.vo);
          setCount(Math.ceil(json.data.vo.length/3));
          setPlist(json.data.vo); 
        }else{
          alert("검색된 자료가 없습니다!");
          rout
        }

      }).catch((Error)=>{
        alert("검색된 자료가 없습니다!")
      });
  }else{
    alert("검색 할 내용을 입력해주세요");
  }


}

 //---------------------------------------
    return(
      <>
    
    <div>
      <Main1_top/>
      <Main1/>
      <Main1_Menu/>
      <Box  div className="cam1">
        <Grid container>
          <Grid item xs>
              <div className="cam2" >
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
            <Grid  item xs className="cam2" >
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
                  <BottomNavigation className="cam3" value={value} onChange={getCategory}>
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
                  <BottomNavigation  className="cam3" value={value} onChange={getCategory}>
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
      
      <Box  div className="cam4">
          <Table className="camt"  size="small" aria-label="a dense table">
            <TableHead>
              <TableRow >
                <TableCell className="camm">이미지</TableCell>
                <TableCell className="camm2">소개</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                
                {plist.map((item,index)=>(
                <TableRow key={index}>
                  <TableCell style={{height:"250px"}}> 
                      <div style={{width:"300px",height:"200px",margin:"auto"}} > 
                      {item.image.length>0 &&(
                      <img 
                        key={index}
                        src={item.image}
                        style={{width:"300px",height:"200px"}}
                      />
                      )}
                      {item.image.length==0 &&(
                      <img 
                        key={index}
                        src={"data:image/png;base64,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"}
                        style={{width:"300px",height:"200px"}}
                      />
                      )}
                    </div>             
                  </TableCell>
                  <TableCell styles={{heigth:"250px"}} >
                    <div style={{borderBottom:"1px solid #dcdcdc"}}>
                      <span className="camm5" >업체명 : </span>
                      <span className="camm3" >{item.title}</span>
                      <span className="camm4" >카테고리 : </span>
                      <span className="camm3" >{item.category}</span>    
                    </div>
                    <div style={{borderBottom:"1px solid #dcdcdc"}}>
                      <span className="camm4" >주소 :</span>
                      <span className="camm6" >{item.addr}</span>
                    </div>
                    <div style={{borderBottom:"1px solid #dcdcdc"}} >
                    <span className="camm4" >전화번호 : </span>
                      <span className="camm3" >{item.tel}</span>
                      <span className="camm4" >예약방법 : </span>
                      <span className="camm3" >{item.manner}</span> 
                    </div>
                    <div style={{borderBottom:"1px solid #dcdcdc"}} >
                      <span className="camm4" >애완동물 : </span>
                      <span className="camm3" >{item.animal}</span>
                      <span className="camm4" >홈페이지 : </span>
                      <span className="camm3" >
                        <Button variant="text" style={{width:'150px',height:"80%",color:"black",border:"1px solid gray"}}  onClick={() => window.open(item.page, '_blank')}>페이지 이동</Button>
                      </span>   
                    </div>
                  </TableCell>
                </TableRow>
              ))}
                <TableRow >
                  <TableCell colSpan={2} >
                  <Stack spacing={2} style={{}}>
                    <Pagination count={count} page={page} onChange={PageChange} style={{margin:"auto"}} />
                  </Stack>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                  <label style={{display:"inline-block",width:"50px",fontSize:"15px"}}>검색 : </label>
                  <TextField name="search" type="text" size="small" variant="standard" placeholder="검색 할 캠핑장" sx={{width:'220px'}} onChange={search} />
                  <Button onClick={search2} >검색하기</Button> 
                  </TableCell>
                </TableRow>
              </TableBody>
          </Table>             
      </Box>
    </div>
    <Main_Bottom/>

    </>
    );
}