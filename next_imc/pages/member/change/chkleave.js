import { Alert, Box, Button, Container, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import { useRef, useState } from "react";
import Main1 from "../../../com/Main1";
import Main1_Menu from "../../../com/Main1_Menu";
import Main_Bottom from "../../../com/Main_Bottom";
import Main1_top from "../../../com/Main_top";
import styles from '../../../styles/Home.module.css';
import regStyles from '../../member/reg.module.css';
import Axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "cookies-next";




export default function chkleave(){

    const m_idx = getCookie("m_idx");
    
    useEffect(()=>{
        if(getCookie("m_idx") == null){
            alert("잘못 된 접근입니다.");
            router.push("/");
        }
    },[]);

    const router = useRouter(); 

    const REG_URL = "/member/chk/pwd";


    const [pw, setPw] = useState('');


    function resetPw(e){
        setPw(e.target.value);
    }



    function submit(){

        if(pw.length <= 0){
            alert("비밀번호를 입력해주세요");
            return;
        }
        if(window.confirm("정말로 탈퇴하시겠습니까 ?")){
            Axios.post(
                REG_URL, null,
                {params:{
                    m_idx: m_idx,
                    pwd: pw,
                }},
            ).then(json => {
                if(json.data== 1){
                    alert("탈퇴완료");
                    deleteCookie("m_idx");
                    deleteCookie("id");
                    deleteCookie("nickname");
                    router.push("/");
                }else{
                    alert("현재 비밀번호가 일치하지 않습니다.");
                }
                
        })
    }

    }


    return (

        <div className={styles.container}>
            <Main1_top/>
            <Main1/>
            <Main1_Menu/>
            <div>
                <Container sx={{margin: 'auto', textAlign: 'center'}}>
                    <Box component="span" sx={{margin:'auto', textAlign:'center'}}>
                        <h1>I AM CAMPER 비밀번호 확인</h1>
                        <Paper elevation={2} sx={{width:'650px', margin:'auto', padding:'10px', marginBottom:'150px', paddingBottom:'30px'}}>
                            <h3></h3>
                            <FormControl>
                                <Stack direction="column" alignItems="center" spacing={1}>
                                    <table style={{textAlign: 'left'}} className={regStyles.table}>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <label>현재 비밀번호</label>
                                                </th>
                                                <td>
                                                    <TextField name="pw" type="password" size="small" variant="standard" placeholder="현재 비밀번호" sx={{width:'220px'}} onChange={resetPw}/>
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                    <div style={{marginTop:'30px'}}>
                                        <Button variant="contained" sx={{width:'150px'}} onClick={submit}>탈퇴하기</Button>
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