import { Alert, Box, Button, Container, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import { useRef, useState } from "react";
import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main_Bottom from "../../com/Main_Bottom";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import regStyles from '../member/reg.module.css';
import Axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie, hasCookie } from "cookies-next";
import router from "next/router";



export default function information(){

    useEffect(()=>{
        if(!hasCookie("m_idx")){
            router.push("/");
        }else{
        setSnschk(false);
        getData();
        }
    },[]);

    const [snschk,setSnschk] = useState(false);

    const [data,setData] = useState({});
    
    
    function getData(){
          Axios.post(
            "http://localhost:8080/member/Information",null,
            { params: { m_idx:getCookie("m_idx")}}
            ).then((json)=>{
                setData(json.data.vo);
                const sns = data.snsAuth
                console.log();
                if(json.data.vo.snsAuth =="naver" || json.data.vo.snsAuth =="kakao" || json.data.vo.snsAuth == "google"){
                    setSnschk(true);
                }
            }).catch((Error)=>{});
      }

    return (

        <div className={styles.container}>
            <Main1_top/>
            <Main1/>
            <Main1_Menu/>
            <div>
                <Container sx={{margin: 'auto', textAlign: 'center'}}>
                    <Box component="span" sx={{margin:'auto', textAlign:'center'}}>
                        <h1>I AM CAMPER 회원 정보 변경</h1>
                        <Paper elevation={2} sx={{width:'650px', margin:'auto', padding:'10px', marginBottom:'150px', paddingBottom:'30px'}}>
                            <h3>I AM CAMPER</h3>
                            <h4>* 표시는 변경 가능한 항목입니다</h4>
                            <FormControl>
                                <Stack direction="column" alignItems="center" spacing={1}>
                                    <table style={{textAlign: 'left'}} className={regStyles.table}>
                                        <tbody>
                                            {!snschk &&(
                                            <tr>
                                                <th>
                                                    <label> 아이디</label>
                                                </th>
                                                <td>
                                                    <span style={{display:"inline-block",width:"200px"}}>{data.id}</span>
                                                </td>
                                            </tr>
                                            )}
                                            {!snschk &&(
                                            <tr>
                                                <th>
                                                    <label>* 비밀번호</label>
                                                </th>
                                                <td>
                                                    <span  style={{display:"inline-block",width:"200px"}}>**********</span>
                                                    <Button variant="outlined" size="small" sx={{marginLeft:'10px'}}  onClick={()=>router.push("/member/change/pwd")}>변경</Button>
                                                </td>
                                            </tr>
                                            )}
                                            
                                            <tr>
                                                <th>
                                                    <label>* 닉네임</label>
                                                </th>
                                                <td>
                                                    <span style={{display:"inline-block",width:"200px"}}>{data.nickname}</span>
                                                    <Button variant="outlined" size="small" sx={{marginLeft:'10px'}} onClick={()=>router.push("/member/change/nickname")} >변경</Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <label>이름</label>
                                                </th>
                                                <td>
                                                    <span style={{display:"inline-block",width:"200px"}}>{data.name}</span>
                                                </td>
                                            </tr>
                                            
                                            {!snschk &&(
                                            <tr>
                                                <th>
                                                    <label>생년월일</label>
                                                </th>
                                                <td>
                                                    <span style={{display:"inline-block",width:"200px"}}>{data.birth}</span>
                                                </td>
                                            </tr>
                                            )}
                                            <tr>
                                                <th>
                                                    <label style={{display:"inline-block",width:"200px"}} >* 이메일</label>
                                                </th>
                                                <td>
                                                    <span style={{display:"inline-block",width:"200px"}}>{data.email}</span>
                                                    <Button variant="outlined" size="small" sx={{marginLeft:'10px'}}  onClick={()=>router.push("/member/change/email")}>변경</Button>
                                                </td>
                                            </tr>
                                            {!snschk &&(
                                            <tr>
                                                <th>
                                                    <label>* 전화번호</label>
                                                </th>
                                                <td>
                                                <span style={{display:"inline-block",width:"200px"}}>{data.phone}</span>
                                                <Button variant="outlined" size="small" sx={{marginLeft:'10px'}} onClick={()=>router.push("/member/change/phone")}>변경</Button>
                                                </td>
                                            </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <div style={{marginTop:'30px'}}>
                                        <Button variant="contained" sx={{width:'150px',marginRight:'50px'}} onClick={()=>router.push("/")}>뒤로 가기</Button>
                                        <Button variant="contained" sx={{width:'150px'}} onClick={()=>router.push("/member/change/leave")}>회원 탈퇴</Button>
                                    </div>
                                </Stack>
                            </FormControl>
                        </Paper>
                    </Box>
                </Container>
            </div>

            <Main_Bottom/>

        </div>



    );



}