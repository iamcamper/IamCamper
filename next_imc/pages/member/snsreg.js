import { Alert, Box, Button, Container, FormControl, Paper, Stack, TextField } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import Main1 from '../../com/Main1';
import Main1_Menu from '../../com/Main1_Menu';
import Main_Bottom from '../../com/Main_Bottom';
import Main1_top from '../../com/Main_top';
import styles from '../../styles/Home.module.css';
import Axios from "axios";
import { useRouter } from 'next/router';
import regStyles from '../member/reg.module.css';

export default function snsreg(){

    const router = useRouter();

    const NICKNAME_CHK_URL = "/member/nickname/chk";
    const ADD_NICKNAME_URL = "/snsreg/add";
    const [nickname, setNickname] = useState("");
    const [nicknameChkValue, setNicknameChkValue] = useState("");

    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/g;

    const m_idx = router.query.m_idx;  

    function resetNickname(e){
    
        if(regExp.test(e.target.value)){
            "닉네임에는 특수문자 및 공백을 사용할 수 없습니다."
        } else {
        setNickname(e.target.value);
        }
    }

    function nicknameChk(){

        if(nickname.length > 0){

            Axios.post(
                NICKNAME_CHK_URL, null,
                {params:{nickname:nickname}}
            ).then(json=>{
                setNicknameChkValue(json.data.chk);
            })
        }
    }

    function snsregistration(){

        Axios.post(
            ADD_NICKNAME_URL, null,
            {params:{m_idx:m_idx, nickname:nickname}},
        ).then(json=>{
            
        })
        
    }

    return(

        <div className={styles.container}>
            <Main1_top/>
            <Main1/>
            <Main1_Menu/>

            <div>
                <Container sx={{margin:'auto', textAlign:'center'}}>
                <Box component="span" sx={{margin:'auto', textAlign:'center'}}>
                    <h1>I AM CAMPER</h1>
                    <Paper elevation={2} sx={{width:'650px',  margin:'auto', padding:'10px', marginBottom:'150px'}}>
                        <h3>I AM CAMPER에서 사용할 닉네임을 입력해 주세요!</h3>
                        <h4>닉네임은 필수 항목입니다!</h4>
                        <FormControl>
                            <Stack direction="column" alignItems="center" spacing={1}>
                                <table className={regStyles.table}>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <label>* 닉네임</label>
                                            </th>
                                            <td>
                                                <TextField name="nickname" size="small" variant="standard" placeholder="닉네임" sx={{width:'150px'}} onChange={resetNickname}/>
                                                <Button variant="outlined" size="small" sx={{marginLeft:'10px'}} onClick={nicknameChk}>중복 확인</Button>
                                            </td>
                                        </tr>
                                        {(nicknameChkValue === 1) && (
                                            <tr>
                                                <th></th>
                                                <td>
                                                    <Alert severity="error">사용할 수 없는 닉네임입니다.</Alert>
                                                </td>
                                            </tr>
                                        )}
                                        {(nicknameChkValue === 0) && (
                                            <tr>
                                                <th></th>
                                                <td>
                                                    <Alert severity='success'>사용 가능한 닉네임입니다!</Alert>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div style={{marginTop:'30px', marginBottom:'30px'}}>
                                    <Button variant="contained" sx={{width:'150px'}} onClick={snsregistration}>회원 가입 완료</Button>
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
