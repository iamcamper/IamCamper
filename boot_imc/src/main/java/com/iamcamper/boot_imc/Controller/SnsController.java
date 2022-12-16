package com.iamcamper.boot_imc.Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.json.simple.parser.JSONParser;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.service.MemService;

@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
@RequestMapping("/sns")
public class SnsController {

    @Autowired
    private MemService m_Service;

    @Autowired
    private HttpServletResponse response;

    // --------------------------------네이버 로그인 ------------------------------
    @ResponseBody
    @RequestMapping("/naverlogin")
    public String getURL() {
        String naverclientId = "g9jGzL0EqFNlxl12PA9i";
        String apiURL = "";
        try {
            String redirectURI = URLEncoder.encode("http://localhost:8080/sns/callback", "UTF-8");
            SecureRandom random = new SecureRandom();
            String state = new BigInteger(130, random).toString();
            apiURL = "https://nid.naver.com/oauth2.0/authorize?response_type=code"
                    + "&client_id=" + naverclientId
                    + "&redirect_uri=" + redirectURI
                    + "&state=" + state;

        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println(apiURL);

        return apiURL;
    }

    @RequestMapping("/callback")
    public void callback(String code, String state) throws UnsupportedEncodingException {

        String clientId = "g9jGzL0EqFNlxl12PA9i";// 애플리케이션 클라이언트 아이디값";
        String clientSecret = "9yF92cvIGz";// 애플리케이션 클라이언트 시크릿값";
        String redirectURI = URLEncoder.encode("http://localhost:8080/sns/callback", "UTF-8");
        String apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code"
                + "&client_id=" + clientId
                + "&client_secret=" + clientSecret
                + "&redirect_uri=" + redirectURI
                + "&code=" + code
                + "&state=" + state;
        String accessToken = "";
        String refresh_token = "";

        String snsId = null;
        String email = null;
        String name = null;
        try {
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            int responseCode = con.getResponseCode();
            BufferedReader br;
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else { // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            String inputLine = null;
            StringBuilder res = new StringBuilder();
            while ((inputLine = br.readLine()) != null) {
                res.append(inputLine);
            }

            br.close();
            if (responseCode == HttpURLConnection.HTTP_OK) {

                JSONParser pars = new JSONParser();
                Object obj = pars.parse(res.toString());
                JSONObject jobj = (JSONObject) obj;
                accessToken = (String) jobj.get("access_token");
                refresh_token = (String) jobj.get("refresh_token");

                String header = "Bearer " + accessToken;

                apiURL = "https://openapi.naver.com/v1/nid/me";

                Map<String, String> requestHeaders = new HashMap<String, String>();
                requestHeaders.put("Authorization", header);
                String responseBody = get(apiURL, requestHeaders);

                System.out.println("body" + responseBody);

                Object obj2 = pars.parse(responseBody);
                jobj = (JSONObject) obj2;
                JSONObject jobj2 = (JSONObject) jobj.get("response");
                snsId = (String) jobj2.get("id");
                email = (String) jobj2.get("email");
                name = (String) jobj2.get("name");

                String snsAuth = "naver";

                MemVO mvo = m_Service.googleChk(snsId, "naver"); // 가입이 되어있는 경우
                MemVO mvo2 = m_Service.googleRegChk(snsId, snsAuth); // 닉네임을 못 받은 경우
                int chk = 1;
                if (mvo != null) {

                    String nickname = URLEncoder.encode(mvo.getNickname(), "UTF-8");
                    String m_idx = mvo.getM_idx();

                    response.sendRedirect("http://localhost:3000/member/login?id=" + mvo.getSnsId()
                            + "&nickname=" + nickname + "&m_idx=" + m_idx);

                } else if (mvo2 != null) {

                    response.sendRedirect("http://localhost:3000/member/snsreg?m_idx=" + mvo2.getM_idx());

                } else {

                    m_Service.googleReg(snsId, snsAuth, email, name);

                    MemVO vo = m_Service.googleRegChk(snsId, snsAuth);

                    StringBuffer buffer = new StringBuffer("http://localhost:3000/member/snsreg?b_idx=");
                    buffer.append(vo.getM_idx());

                    response.sendRedirect("http://localhost:3000/member/snsreg?m_idx=" + vo.getM_idx());
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    // --------------------------------네이버 로그인 ------------------------------
    // --------------------------------네이버 로그인 오류 처리 ------------------------------
    private String get(String apiUrl, Map<String, String> requestHeaders) {
        HttpURLConnection con = connect(apiUrl);
        try {
            con.setRequestMethod("GET");
            for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
                return readBody(con.getInputStream());
            } else { // 에러 발생
                return readBody(con.getErrorStream());
            }
        } catch (Exception e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private HttpURLConnection connect(String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection) url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private String readBody(InputStream body) {
        InputStreamReader streamReader = new InputStreamReader(body);

        try {
            BufferedReader lineReader = new BufferedReader(streamReader);
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (Exception e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }
    // --------------------------------네이버 로그인 오류 처리 ------------------------------

}
