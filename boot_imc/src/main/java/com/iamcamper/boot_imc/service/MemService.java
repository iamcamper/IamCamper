package com.iamcamper.boot_imc.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.mapper.MemMapper;

@Service
public class MemService {

    @Autowired
    private MemMapper mapper;

    /*
     * 회원(local) 로그인
     */
    public MemVO login(String id, String pw) {
        return mapper.login(id, pw);
    }

    public String getKakaoAccessToken(String code) {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            // POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=80dbe36c8a45235bf28e54201f359542");
            sb.append("&redirect_uri=http://localhost:8080/sns/kakaologin");
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            // 결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode); // sysout(삭제예정)

            // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            // Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JSONParser pars = new JSONParser();
            Object obj = pars.parse(result.toString());
            JSONObject jobj = (JSONObject) obj;

            access_Token = (String) jobj.get("access_token");
            refresh_Token = (String) jobj.get("refresh_token");

            System.out.println("access_token : " + access_Token); // sysout(삭제예정)
            System.out.println("refresh_token : " + refresh_Token); // sysout(삭제예정)

        } catch (Exception e) {
            e.printStackTrace();
        }

        return access_Token;
    }

    public HashMap<String, Object> UserKakaoLogin(String access_Token) {

        HashMap<String, Object> userInfo = new HashMap<>();

        String reqURL = "https://kapi.kakao.com/v2/user/me";

        // access_token을 이용하여 사용자 정보 조회
        try {

            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + access_Token); // 전송할 header 작성, access_token전송

            // 결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode); // sysout(삭제예정)

            // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result); // sysout(삭제예정)

            // Gson 라이브러리로 JSON파싱
            JSONParser pars = new JSONParser();
            Object obj = pars.parse(result.toString());
            JSONObject jobj = (JSONObject) obj;

            JSONObject kakao_acc = (JSONObject) jobj.get("kakao_account");
            JSONObject prop = (JSONObject) jobj.get("properties");

            Object snsId = jobj.get("id");
            String email = (String) kakao_acc.get("email");
            String snsNickname = (String) prop.get("nickname");
            Object snsByear = jobj.get("birthday");

            System.out.println(snsId);
            System.out.println(email);
            System.out.println(snsNickname);
            System.out.println(snsByear);

            userInfo.put("id", snsId);
            userInfo.put("snsId", snsId);
            userInfo.put("snsNickname", snsNickname);
            userInfo.put("snsByear", snsByear);
            userInfo.put("email", email);

        } catch (Exception e) {
            e.printStackTrace();
        }
        mapper.kakaoinsert(userInfo);

        return userInfo;
    }

    public void UserKakaoLogout(String access_Token) {
        String reqURL = "https://kapi.kakao.com/v1/user/logout";
        try {

            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + access_Token); // 전송할 header 작성, access_token전송

            // 결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode); // sysout(삭제예정)

            // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

            String result = "";
            String line = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /*
     * 회원가입 아이디 중복 체크
     */
    public MemVO idChk(String id){

        return mapper.idChk(id);
        
    }

    /*
     * 회원가입 닉네임 중복 체크
     */
    public MemVO nicknameChk(String nickname){

        return mapper.nicknameChk(nickname);

    }

    /*
     * 회원가입
     */
    public void reg(String id, String pw, String nickname,
        String name, String email, String birth, String phone){

            mapper.reg(id, pw, nickname, name, email, birth, phone);

    }

    /*
     * 구글 로그인 체크
     */
    public MemVO googleChk(String snsId, String auth){

        MemVO mvo = mapper.googleChk(snsId, auth);

        return mvo;

    }

    /*
     * 구글 로그인 초기 DB 저장
     */
    public void googleReg(String snsId, String snsAuth, String email, String name){

        mapper.googleReg(snsId, snsAuth, name, email);

    }

    /*
     * 구글 로그인 grade가 9이고 닉네임이 입력 안 된 db검색
     */
    public MemVO googleRegChk(String snsId, String snsAuth){

        MemVO mvo = mapper.googleRegChk(snsId, snsAuth);

        return mvo;

    }
}
