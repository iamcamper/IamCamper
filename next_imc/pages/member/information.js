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
import { getCookie } from "cookies-next";



export default function information(){

    const [LoginID,setLoginID] = useState(getCookie("id"));

    useEffect(()=>{

        console.log(LoginID);
    },[])

    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);

        useEffect(()=>{
            if(didMount.current) func();
            else didMount.current = true;
        }, deps);
    };

    const router = useRouter(); 

    const REG_URL = "/member/reg/ok";

    const [id, setId] = useState('');
    const ID_CHK_URL = "/member/id/chk"
    const [idChkValue, setIdChkValue] = useState();

    const [pw, setPw] = useState('');
    const [chkPw, setChkPw] = useState('');
    const [pwChkValue, setPwChkValue] = useState(0);

    const [nickname, setNickname] = useState('');
    const NICKNAME_CHK_URL = "/member/nickname/chk";
    const [nicknameChkValue, setNicknameChkValue] = useState('');

    const [name, setName] = useState();

    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');

    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');

    const [birth, setBirth] = useState();

    //특수문자 체크
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/g;

    //숫자 체크
    const numExp = /[0-9]/g;

    //이메일 체크
    const emailExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    function resetId(e){

        if(regExp.test(e.target.value)){
            alert("아이디에는 특수문자 또는 공백을 사용할 수 없습니다.");
            e.target.value = '';
            return;
        }
        setId(e.target.value);
    }

    function idChk(){

        if(id.length > 0) {

            Axios.post(
                ID_CHK_URL, null,
                {params: {id:id}},
            ).then(json => {
                setIdChkValue(json.data.chk);
            })

        } else {
            alert("아이디를 입력해 주세요.");
            return;
        }
    }

    function resetNickname(e){

        if(regExp.test(e.target.value)){
            alert("닉네임에는 특수문자 및 공백을 사용할 수 없습니다.");
            e.target.value = '';
            return;
        }
        setNickname(e.target.value);
    }

    function nicknameChk(){

        if(nickname.length > 0) {

            Axios.post(
                NICKNAME_CHK_URL, null,
                {params: {nickname:nickname}}
            ).then(json => {
                setNicknameChkValue(json.data.chk);
            })

        } else {
            alert("닉네임을 입력해 주세요.");
            return;
        }
    }

    function resetPw(e){
        setPw(e.target.value);
    }

    function pwChk(e){
        setChkPw(e.target.value);
    }

    function resetName(e){

        if(regExp.test(e.target.value)){
            alert("이름에는 특수문자 또는 공백을 사용할 수 없습니다.");
            e.target.value = '';
            return;
        }
        setName(e.target.value);

    }

    function resetEmail1(e){
        setEmail1(e.target.value);
    }

    function resetEmail2(e){
        setEmail2(e.target.value);
    }

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

    function resetBirth(e){
        setBirth(e.target.value);
    }

    function submit(){

        let email = null;
        let phone = null;

        if(!emailExp.test(email1+"@"+email2)){
            alert("올바른 이메일 형식이 아닙니다.");
            return;
        }

        if(id.length < 1 && idChkValue === 1 ){
            alert("아이디를 다시 확인해 주세요.");
            return;
        }

        if(pw < 0 || chkPw < 0 || pwChkValue === 1){
            alert("비밀번호를 다시 확인해 주세요.");
            return;
        }

        if(nickname.length < 1){
            alert("닉네임을 입력해 주세요.");
            return;
        }

        if(email1.length > 0 && email2.length > 0) {
            email = email1 + "@" + email2;
        }

        if(phone1.length > 0 && phone2.length > 0 && phone3.length > 0){
            phone = phone1 + "-" + phone2 + "-" + phone3;
        }

        Axios.post(
            REG_URL, null,
            {params:{
                id: id,
                pw: pw,
                nickname: nickname,
                name: name,
                phone: phone,
                birth: birth,
                email: email,
            }},
        ).then(json => {
            if(json.data.chk === 1){
                alert("회원 가입에 실패했습니다.");
            } else {
                alert("정상적으로 가입되셨습니다!");
                router.push("/member/login");
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
                        <h1>I AM CAMPER 회원 정보 변경</h1>
                        <Paper elevation={2} sx={{width:'650px', margin:'auto', padding:'10px', marginBottom:'150px', paddingBottom:'30px'}}>
                            <h3>I AM CAMPER</h3>
                            <h4>* 표시는 변경 가능한 항목입니다</h4>
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
                                            {(pwChkValue === 1) && (
                                                <tr>
                                                    <th></th>
                                                    <td>
                                                        <Alert severity="error">비밀번호가 일치하지 않습니다!</Alert>
                                                    </td>
                                                </tr>
                                            )}
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
                                                    <TextField name="name" size="small" variant="standard" placeholder="name" sx={{width:'220px'}} onChange={resetName}/>
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
                                                    onChange={resetBirth}
                                                />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <label>* 이메일</label>
                                                </th>
                                                <td>
                                                    <TextField name="email1" size="small" variant="standard" sx={{width:'80px'}} onChange={resetEmail1}/>@
                                                    <TextField name="email2" size="small" variant="standard" sx={{width:'130px'}} onChange={resetEmail2}/>
                                                </td>
                                            </tr>
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
                                        <Button variant="contained" sx={{width:'150px'}} onClick={submit}>회원 가입</Button>
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