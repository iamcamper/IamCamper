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



export default function email(){
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

    const REG_URL = "/member/add/email";

    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');

    //이메일 체크
    const emailExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    function resetEmail1(e){
        setEmail1(e.target.value);
    }

    function resetEmail2(e){
        setEmail2(e.target.value);
    }



    function addemail(){

        let email = null;

        if(!emailExp.test(email1+"@"+email2)){
            alert("올바른 이메일 형식이 아닙니다.");
            return;
        }

        if(email1.length > 0 && email2.length > 0) {
            email = email1 + "@" + email2;
        }

        Axios.post(
            REG_URL, null,
            {params:{
                m_idx:m_idx,
                email: email
            }},
        ).then(json => {
            console.log(json);
            if(json.data === 1){
                alert("이메일 저장에 성공했습니다.");
                router.push("/member/information ");
            }else{
                alert("이메일 저장에 실패했습니다. 다시 시도해 주세요!");
            }
        })


    }


    return (

        <div className={styles.container}>
            <Main1_top/>
            <Main1/>
            <Main1_Menu/>
            <div>
                <Container sx={{margin: 'auto', textAlign: 'center'}}>
                    <Box component="span" sx={{margin:'auto', textAlign:'center'}}>
                        <h1>I AM CAMPER 이메일 변경</h1>
                        <Paper elevation={2} sx={{width:'650px', margin:'auto', padding:'10px', marginBottom:'150px', paddingBottom:'30px'}}>
                            <h3>I AM CAMPER 사용할 이메일을 입력해 주세요!</h3>
                            <FormControl>
                                <Stack direction="column" alignItems="center" spacing={1}>
                                    <table style={{textAlign: 'left'}} className={regStyles.table}>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <label>이메일</label>
                                                </th>
                                                <td>
                                                    <TextField name="email1" size="small" variant="standard" sx={{width:'80px'}} onChange={resetEmail1}/>@
                                                    <TextField name="email2" size="small" variant="standard" sx={{width:'130px'}} onChange={resetEmail2}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div style={{marginTop:'30px'}}>
                                        <Button variant="contained" sx={{width:'150px'}} onClick={addemail}>변경하기</Button>
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