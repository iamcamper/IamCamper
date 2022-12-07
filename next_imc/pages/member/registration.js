import { Alert, Box, Button, Container, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import { useState } from "react";
import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main_Bottom from "../../com/Main_Bottom";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import regStyles from '../member/reg.module.css';
import Axios from "axios";
import { useEffect } from "react";



export default function registration(){

    const [id, setId] = useState('');
    const ID_CHK_URL = "/member/id/chk"
    const [idChkValue, setIdChkValue] = useState('');

    const [pw, setPw] = useState('');
    let chkPw = '';
    const [pwChkValue, setPwChkValue] = useState('');

    const [nickname, setNickname] = useState('');
    const NICKNAME_CHK_URL = "/member/nickname/chk";
    const [nicknameChkValue, setNicknameChkValue] = useState('');

    function resetId(e){
        setId(e.target.value);
    }

    function idChk(){
        Axios.post(
            ID_CHK_URL, null,
            {params: {id:id}},
        ).then(json => {
            setIdChkValue(json.data.chk);
        })
    }

    function resetNickname(e){
        setNickname(e.target.value);
    }

    function nicknameChk(){
        Axios.post(
            NICKNAME_CHK_URL, null,
            {params: {nickname:nickname}}
        ).then(json => {
            setNicknameChkValue(json.data.chk);
        })
    }

    function resetPw(e){
        setPw(e.target.value);
    }

    function pwChk(e){
        
        chkPw = e.target.value;
        
        if(pw === chkPw){
            setPwChkValue(0);
        } else{
            setPwChkValue(1);
        }

        console.log(pwChkValue);
    }
    

    return (

        <div className={styles.container}>
            <Main1_top/>
            <Main1/>
            <Main1_Menu/>
            <div>
                <Container sx={{margin: 'auto', textAlign: 'center'}}>
                    <Box component="span" sx={{margin:'auto', textAlign:'center'}}>
                        <h1>I AM CAMPER 회원 가입</h1>
                        <Paper elevation={2} sx={{width:'650px', margin:'auto', padding:'10px', marginBottom:'150px', paddingBottom:'30px'}}>
                            <h3>I AM CAMPER</h3>
                            <h4>* 표시는 꼭 작성해야 하는 필수 항목입니다</h4>
                            <FormControl>
                                <Stack direction="column" alignItems="center" spacing={1}>
                                    <table style={{textAlign: 'left'}} className={regStyles.table}>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <label>* 아이디</label>
                                                </th>
                                                <td>
                                                    <TextField name="id" size="small" variant="standard" placeholder="ID" sx={{width:'220px'}} onChange={resetId}/>
                                                    <Button variant="outlined" size="small" sx={{marginLeft:'10px'}} onClick={idChk}>중복 확인</Button>
                                                </td>
                                            </tr>
                                            {(idChkValue === 0) && (
                                                <tr>
                                                    <th></th>
                                                    <td>
                                                        <Alert severity="success">사용 가능한 아이디입니다!</Alert>
                                                    </td>
                                                </tr>
                                            )}
                                            {(idChkValue === 1) && (
                                                <tr>
                                                    <th></th>
                                                    <td>
                                                        <Alert severity="error">사용할 수 없는 아이디입니다!</Alert>
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <th>
                                                    <label>* 비밀번호</label>
                                                </th>
                                                <td>
                                                    <TextField name="pw" type="password" size="small" variant="standard" placeholder="password" sx={{width:'220px'}} onChange={resetPw}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <label>* 비밀번호 확인</label>
                                                </th>
                                                <td>
                                                    <TextField name="pwChk" type="password" size="small" variant="standard" placeholder="password" sx={{width:'220px'}} onChange={pwChk}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <label>* 닉네임</label>
                                                </th>
                                                <td>
                                                    <TextField name="nickname" size="small" variant="standard" placeholder="nickname" sx={{width:'220px'}} onChange={resetNickname}/>
                                                    <Button variant="outlined" size="small" sx={{marginLeft:'10px'}} onClick={nicknameChk}>중복 확인</Button>
                                                </td>
                                            </tr>
                                            {(nicknameChkValue === 0) && (
                                                <tr>
                                                    <th></th>
                                                    <td>
                                                        <Alert severity="success">사용 가능한 닉네임입니다!</Alert>
                                                    </td>
                                                </tr>
                                            )}
                                             {(nicknameChkValue === 1) && (
                                                <tr>
                                                    <th></th>
                                                    <td>
                                                        <Alert severity="error">중복된 닉네임입니다!</Alert>
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <th>
                                                    <label>이름</label>
                                                </th>
                                                <td>
                                                    <TextField name="name" size="small" variant="standard" placeholder="name" sx={{width:'220px'}}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <label>생년월일</label>
                                                </th>
                                                <td>
                                                <TextField
                                                    name="birth"
                                                    label="Birthday"
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    sx={{ width: 220 }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    size="small"
                                                />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <label>이메일</label>
                                                </th>
                                                <td>
                                                    <TextField name="email1" size="small" variant="standard" sx={{width:'80px'}}/>@
                                                    <TextField name="email2" size="small" variant="standard" sx={{width:'130px'}}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <label>전화번호</label>
                                                </th>
                                                <td>
                                                    <TextField name="phone1" size="small" variant="standard" sx={{width:'50px'}}/>-
                                                    <TextField name="phone2" size="small" variant="standard" sx={{width:'80px'}}/>-
                                                    <TextField name="phone3" size="small" variant="standard" sx={{width:'80px'}}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div style={{marginTop:'30px'}}>
                                        <Button variant="contained" sx={{width:'150px'}}>회원 가입</Button>
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