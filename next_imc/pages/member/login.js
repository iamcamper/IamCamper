import Main1 from "../../com/Main1";
import Main1_Menu from "../../com/Main1_Menu";
import Main_Bottom from "../../com/Main_Bottom";
import Main1_top from "../../com/Main_top";
import styles from '../../styles/Home.module.css';
import { Box, Container, Paper, FormControl, Stack, TextField, Button, Link } from '@mui/material';
import { useState, useEffect } from "react";
import Axios from 'axios';
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";

export default function login() {

    const router = useRouter();

    const API_URL = "/sns/naverlogin";
    const [naverURL, setNaverURL] = useState("");

    //local login
    const LOGIN_URL = "/member/login/chk";
    const [id, setId] = useState();
    const [pw, setPw] = useState();

    //google login
    const googleURL = "/sns/googlelogin"
    const [googleLoginURL, setGoogleLoginURL] = useState("");

    const snsId = router.query.id;
    const nickname = router.query.nickname;
    const m_idx = router.query.m_idx;


    function changeId(e) {
        setId(e.target.value);
    }

    function changePw(e) {
        setPw(e.target.value);
    }

    function localLogin() {

        Axios.post(
            LOGIN_URL, null,
            { params: { id: id, pw: pw } },
        ).then(json => {
            if (json.data.chk === 0) {
                alert("아이디 또는 비밀번호가 일치하지 않습니다.");
                router.push("/member/login");
            }
            else {
                setCookie("id", json.data.user.id);
                setCookie("nickname", json.data.user.nickname);
                setCookie("m_idx", json.data.user.m_idx);
                router.push("/");
            }
        })
    }

    function getURL() {
        Axios.get(
            API_URL
        ).then((json) => {
            setNaverURL(json.data);
        });
    }

    function getGoogleURL() {
        Axios.get(
            googleURL
        ).then((json) => {
            setGoogleLoginURL(json.data);
        });
    }


    useEffect(() => {
        getURL();
        getGoogleURL();
    }, []);

    useEffect(() => {
        console.log(nickname+"/"+snsId+"/"+m_idx);
        if (!router.isReady) return;

        if (snsId != undefined || nickname != undefined  ) {
            setCookie("id", snsId);
            setCookie("nickname", nickname);
            setCookie("m_idx", m_idx);
            router.push("/");
        }
    }, [router.isReady]);




    return (
        <div className={styles.container}>

            <Main1_top />
            <Main1 />
            <Main1_Menu />

            <div >
                <Container sx={{ margin: 'auto', textAlign: 'center' }}>
                    <Box component="span" sx={{ margin: 'auto', textAlign: 'center' }}>
                        <h1>I AM CAMPER</h1>
                        <Paper elevation={2} sx={{ width: '500px', height: '300px', margin: 'auto', padding: '10px' }}>
                            <h2>Member Login</h2>
                            <FormControl>
                                <Stack direction="column" alignItems="center" spacing={1}>
                                    <TextField name="id" label="Enter User ID" fullWidth autoFocus onChange={changeId}></TextField>
                                    <TextField name="pw" label="Enter User Password" type="password" fullWidth onChange={changePw}></TextField>
                                    <Button variant="contained" fullWidth onClick={localLogin}>로그인</Button>
                                </Stack>
                            </FormControl>
                            <Link href={"/member/registration"}><p>회원 가입</p></Link>
                        </Paper>
                        <Paper elevation={2} sx={{ width: '500px', height: '280px', margin: 'auto', padding: '10px', marginTop: '10px', marginBottom: '50px' }}>
                            <h2>간편 소셜 로그인</h2>
                            <div>
                                <Link href={"https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=80dbe36c8a45235bf28e54201f359542&redirect_uri=http://localhost:8080/sns/kakaologin"}>
                                    <img src="../images/kakao_login.png" alt="kakaologin" width="183px" height="45px">
                                    </img></Link></div>
                            <div>
                                <Link href={naverURL} >
                                    <img src="../images/naver_login.png" alt="naverlogin" width="183px" height="45px" />
                                </Link>
                            </div>
                            <div>
                                <Link href={googleLoginURL}>
                                    <img src="../images/google_login.png" alt="googlelogin" width="183px" height="45px" />
                                </Link>
                            </div>
                        </Paper>
                    </Box>
                </Container>
            </div>

            <Main_Bottom />

        </div>
    );
}
