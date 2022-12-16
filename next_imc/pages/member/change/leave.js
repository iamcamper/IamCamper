import {Alert, Box, Button, Container, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import { useRef, useState } from "react";
import Main1 from "../../../com/Main1";
import Main1_Menu from "../../../com/Main1_Menu";
import Main_Bottom from "../../../com/Main_Bottom";
import Main1_top from "../../../com/Main_top";
import styles from '../../../styles/Home.module.css';
import regStyles from '../../member/reg.module.css';
import Axios from "axios";
import { useEffect } from "react";
import router from "next/router";
import { deleteCookie,getCookie } from "cookies-next";
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';






export default function leave(){

    const m_idx = getCookie("m_idx");
    
    const [snschk,setSnschk] = useState(false);

    useEffect(()=>{
        if(getCookie("m_idx") == null){
            alert("잘못 된 접근입니다.");
            router.push("/");
        }
        Axios.post(
            "http://localhost:8080/member/Information",null,
            { params: { m_idx:getCookie("m_idx")}}
            ).then((json)=>{
                if(json.data.vo.snsAuth =="naver" || json.data.vo.snsAuth =="kakao" || json.data.vo.snsAuth == "google"){
                    setSnschk(true);
                }
            }).catch((Error)=>{});
    },[]);


    function submit(){


        if(checked){
            router.push("/member/change/chkleave");
        }else{
            alert("I AM CAMPER 탈퇴 안내 동의해주세요")
        }

    }

    function submit2(){


        if(checked){
            if(window.confirm("정말로 탈퇴하시겠습니까?")){
                Axios.post(
                    "http://localhost:8080/member/del/pwd", null,
                    {params:{
                        m_idx: m_idx,
                    }},
                ).then(json => {
                    console.log(json);
                    if(json.data == 1){
                        alert("탈퇴완료");
                        deleteCookie("m_idx");
                        deleteCookie("id");
                        deleteCookie("nickname");
                        router.push("/");
                    }else{
                        alert("회원탈퇴 실패");
                    }
                });
            }
        }else{
            alert("I AM CAMPER 탈퇴 안내 동의해주세요")
        }

    }

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        console.log(checked);
    };

    return (

        <div className={styles.container}>
            <Main1_top/>
            <Main1/>
            <Main1_Menu/>
            <div>
                <Container sx={{margin: 'auto', textAlign: 'center'}}>
                    <Box component="span" sx={{margin:'auto', textAlign:'center'}}>
                        <h1>I AM CAMPER 회원탈퇴</h1>
                        <Paper elevation={2} sx={{width:'650px', margin:'auto', padding:'10px', marginBottom:'150px', paddingBottom:'30px'}}>
                            <h3>I AM CAMPER 탈퇴 안내</h3>
                            <FormControl>
                                <Stack direction="column" alignItems="center" spacing={1}>
                                    <table style={{textAlign: 'left'}} >
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <label style={{display:"block" ,marginLeft:"20px",marginBottom:"20px"}}>◆ 탈퇴 후 회원정보 및 개인형 서비스 이용기록은 모두 삭제됩니다.</label>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <span style={{display:"block" , width:"80%",margin:"auto",padding:"30px", border:"0.5px solid #bebebe",borderRadius:"5px",fontSize:"14px"}}>회원정보 및 게시글,댓글 등 개인형 서비스 이용기록은 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다. 삭제되는 내용을 확인하시고 필요한 데이터는 미리 백업을 해주세요. </span>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style={{margin:"0"}}>
                                                    <Checkbox
                                                    checked={checked}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                    style={{marginLeft:"60px"}}
                                                    />
                                                     <span  style={{display:"inline-block"}}>동의합니다.</span>
                                                    
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div style={{marginTop:'30px'}}>
                                        {!snschk &&(
                                        <Button variant="contained" sx={{width:'150px'}} onClick={submit}>탈퇴하기</Button>
                                        )}
                                        {snschk &&(
                                        <Button variant="contained" sx={{width:'150px'}} onClick={submit2}>탈퇴하기</Button>
                                        )}
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