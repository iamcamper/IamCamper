import { Alert, Box, Button, Container, FormControl, Paper, Stack, TextField } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Main1 from '../../../com/Main1';
import Main1_Menu from '../../../com/Main1_Menu';
import Main_Bottom from '../../../com/Main_Bottom';
import Main1_top from '../../../com/Main_top';
import styles from '../../../styles/Home.module.css';
import Axios from "axios";
import { useRouter } from 'next/router';
import regStyles from '../../member/reg.module.css';
import { getCookie, setCookie } from 'cookies-next';
import router from "next/router";



export default function phone(){

    const m_idx = getCookie("m_idx");
    
    useEffect(()=>{
        if(getCookie("m_idx") == null){
            alert("잘못 된 접근입니다.");
            router.push("/");
        }
    },[]);

    const router = useRouter(); 

    const REG_URL = "/member/add/phone";


    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');

    //숫자 체크
    const numExp = /[0-9]/g;


    function resetPhone1(e){

        if(!numExp.test(e.target.value)){
            alert("전화번호는 숫자만 입력 가능합니다.");
            e.target.value = '';
            return;
        }
        setPhone1(e.target.value);
    }

    function resetPhone2(e){

        if(!numExp.test(e.target.value)){
            alert("전화번호는 숫자만 입력 가능합니다.");
            e.target.value = '';
            return;
        }
        setPhone2(e.target.value);
    }

    function resetPhone3(e){

        if(!numExp.test(e.target.value)){
            alert("전화번호는 숫자만 입력 가능합니다.");
            e.target.value = '';
            return;
        }
        setPhone3(e.target.value);
    }
    function submit(){
        let phone = null;
        if(phone1.length > 0 && phone2.length > 0 && phone3.length > 0){
            phone = phone1 + "-" + phone2 + "-" + phone3;
        }

        Axios.post(
            REG_URL, null,
            {params:{
                m_idx: m_idx,
                phone: phone,
            }},
        ).then(json => {
            if(json.data === 1){
                alert("전화번호 저장에 성공했습니다.");
                router.push("/member/information ");
            }else{
                alert("전화번호 저장에 실패했습니다. 다시 시도해 주세요!");
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
                        <h1>I AM CAMPER 전화번호 변경</h1>
                        <Paper elevation={2} sx={{width:'650px', margin:'auto', padding:'10px', marginBottom:'150px', paddingBottom:'30px'}}>
                            <h3>I AM CAMPER 사용할 전화번호를 입력해 주세요!</h3>
                            <FormControl>
                                <Stack direction="column" alignItems="center" spacing={1}>
                                    <table style={{textAlign: 'left'}} className={regStyles.table}>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <label>전화번호</label>
                                                </th>
                                                <td>
                                                    <TextField name="phone1" size="small" variant="standard" sx={{width:'50px'}} onChange={resetPhone1}/>-
                                                    <TextField name="phone2" size="small" variant="standard" sx={{width:'80px'}} onChange={resetPhone2}/>-
                                                    <TextField name="phone3" size="small" variant="standard" sx={{width:'80px'}} onChange={resetPhone3}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div style={{marginTop:'30px'}}>
                                        <Button variant="contained" sx={{width:'150px'}} onClick={submit}>변경 하기</Button>
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