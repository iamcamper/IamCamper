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
import { getCookie } from "cookies-next";




export default function pwd(){

    const m_idx = getCookie("m_idx");
    
    useEffect(()=>{
        if(getCookie("m_idx") == null){
            alert("잘못 된 접근입니다.");
            router.push("/");
        }
    },[]);

    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);

        useEffect(()=>{
            if(didMount.current) func();
            else didMount.current = true;
        }, deps);
    };

    const router = useRouter(); 

    const REG_URL = "/member/add/pwd";


    const [pw, setPw] = useState('');
    const [pw2, setPw2] = useState('');
    const [chkPw, setChkPw] = useState('');
    const [pwChkValue, setPwChkValue] = useState(0);

    //특수문자 체크
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/g;

    //숫자 체크
    const numExp = /[0-9]/g;

    function resetPw2(e){
        setPw2(e.target.value);

    }

    function resetPw(e){
        setPw(e.target.value);
    }

    function pwChk(e){
        setChkPw(e.target.value);
    }

    function submit(){

        if(pw < 0 || chkPw < 0 || pwChkValue === 1){
            alert("비밀번호를 다시 확인해 주세요.");
            return;
        }

        Axios.post(
            REG_URL, null,
            {params:{
                m_idx: m_idx,
                pwd: pw,
                pwd2:pw2,
            }},
        ).then(json => {
            console.log(json);
            if(json.data === 1){
                alert("비밀번호 변경에 성공했습니다.");
                router.push("/member/information ");
            }else{
                alert("현재 비밀번호가 일치하지 않습니다.");
            }
        })


    }


    useDidMountEffect(() => {
        if(pw != chkPw)
            setPwChkValue(1);
        else
            setPwChkValue(2);
    }, [chkPw]);

    return (

        <div className={styles.container}>
            <Main1_top/>
            <Main1/>
            <Main1_Menu/>
            <div>
                <Container sx={{margin: 'auto', textAlign: 'center'}}>
                    <Box component="span" sx={{margin:'auto', textAlign:'center'}}>
                        <h1>I AM CAMPER 비밀번호 변경</h1>
                        <Paper elevation={2} sx={{width:'650px', margin:'auto', padding:'10px', marginBottom:'150px', paddingBottom:'30px'}}>
                            <h3>I AM CAMPER 비밀번호 변경</h3>
                            <FormControl>
                                <Stack direction="column" alignItems="center" spacing={1}>
                                    <table style={{textAlign: 'left'}} className={regStyles.table}>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <label>현재 비밀번호</label>
                                                </th>
                                                <td>
                                                    <TextField name="id" type="password"   size="small" variant="standard" placeholder="현재 비밀번호" sx={{width:'220px'}} onChange={resetPw2} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <label>새 비밀번호</label>
                                                </th>
                                                <td>
                                                    <TextField name="pw" type="password" size="small" variant="standard" placeholder="새 비밀번호" sx={{width:'220px'}} onChange={resetPw}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <label>새 비밀번호 확인</label>
                                                </th>
                                                <td>
                                                    <TextField name="pwChk" type="password" size="small" variant="standard" placeholder="새 비밀번호 확인" sx={{width:'220px'}} onChange={pwChk}/>
                                                </td>
                                            </tr>
                                            {(pwChkValue === 1) && (
                                                <tr>
                                                    <th></th>
                                                    <td>
                                                        <Alert severity="error">비밀번호가 일치하지 않습니다!</Alert>
                                                    </td>
                                                </tr>
                                            )}
                                            
                                        </tbody>
                                    </table>
                                    <div style={{marginTop:'30px'}}>
                                        <Button variant="contained" sx={{width:'150px'}} onClick={submit}>변경하기</Button>
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