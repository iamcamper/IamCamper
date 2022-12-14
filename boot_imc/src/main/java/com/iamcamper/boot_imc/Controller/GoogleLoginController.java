
package com.iamcamper.boot_imc.Controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpHeaders;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpConnection;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.iamcamper.boot_imc.VO.GoogleOAuthRequestVO;
import com.iamcamper.boot_imc.VO.GoogleOAuthResponseVO;
import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.service.MemService;
import com.iamcamper.boot_imc.util.RestTemplateErrorHandler;

@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
public class GoogleLoginController {

    @Autowired
    private MemService m_service;

    private String authUrl = "https://oauth2.googleapis.com/token";
    private String loginBaseUrl = "https://accounts.google.com";
    private String redirectUri = "http://localhost:8080/sns/googlelogin/callback";
    private String clientId = "25322370333-cb2fvvk7l92c7086hv503n657oa2fadg.apps.googleusercontent.com";
    private String secret = "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";

    @Autowired
    private HttpServletResponse response;


    // 구글 로그인 페이지로 이동
    @RequestMapping("/sns/googlelogin")
    @ResponseBody
    public String getGoogleAuthUrl(HttpServletRequest req){

        String reqUrl = loginBaseUrl + 
        "/o/oauth2/v2/auth?client_id=" + clientId + 
        "&redirect_uri=" + redirectUri +
        "&response_type=code" +
        "&scope=email%20profile%20openid" +
        "&access_type=offline";

        return reqUrl;
    }

    @RequestMapping(value="/sns/googlelogin/callback")
    public void googleLogin(@RequestParam(value="code") String code, HttpServletResponse res, RedirectAttributes redirect) throws Exception {

        Map <String, Object> map = new HashMap<String, Object>();

        String access_Token = "";

        try{
            URL url = new URL(authUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //post로 요청하기
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuffer sb = new StringBuffer();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=");
            sb.append(clientId);
            sb.append("&client_secret=");
            sb.append(secret);
            sb.append("&redirect_uri=");
            sb.append(redirectUri);
            sb.append("&code="+code);
            bw.write(sb.toString());
            bw.flush();

            int responseCode = conn.getResponseCode();
            
            if(responseCode == 200){
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String line = "";
                String result = "";

                while ((line = br.readLine()) != null){
                    result += line;
                }

                JSONParser parser = new JSONParser();
                Object obj = parser.parse(result);
                JSONObject jobj = (JSONObject) obj;
                access_Token = (String) jobj.get("access_token");

                br.close();
                bw.close();

                try{

                    String reqUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
                    

                    URL rUrl = new URL(reqUrl);
                    HttpURLConnection rconn = (HttpURLConnection) rUrl.openConnection();
                    rconn.setRequestProperty("Authorization", "Bearer " + access_Token);
                    rconn.setRequestMethod("GET");
                    rconn.setDoOutput(true);
                
                    int resCode = rconn.getResponseCode();
                        
                    if(resCode == 200){
                        BufferedReader br2 = new BufferedReader(new InputStreamReader(rconn.getInputStream()));
                        String line2 = "";
                        String result2 = "";

                        while((line2 = br2.readLine())!=null){
                            result2 += line2;
                        }

                        JSONParser pars = new JSONParser();
                        Object obj2 = (Object)pars.parse(result2);
                        JSONObject jobj2 = (JSONObject) obj2;

                        String snsId = (String)jobj2.get("id");
                        String email = (String)jobj2.get("email");
                        String name = (String)jobj2.get("name");
                        String snsAuth = "google";

                        MemVO mvo = m_service.googleChk(snsId, "google"); //가입이 되어있는 경우
                        MemVO mvo2 = m_service.googleRegChk(snsId, snsAuth); //닉네임을 못 받은 경우
                        int chk = 1;

                        if(mvo != null){

                            String nickname = URLEncoder.encode(mvo.getNickname(), "UTF-8");

                            response.sendRedirect("http://localhost:3000/member/login?id="+mvo.getSnsId()+"&nickname="+nickname);

                        } else if(mvo2 != null) {

                            response.sendRedirect("http://localhost:3000/member/snsreg?m_idx="+mvo2.getM_idx());
                            
                        } else {

                            m_service.googleReg(snsId, snsAuth, email, name);

                            MemVO vo = m_service.googleRegChk(snsId, snsAuth);
                            
                            StringBuffer buffer = new StringBuffer("http://localhost:3000/member/snsreg?b_idx=");
                            buffer.append(vo.getM_idx());

                            response.sendRedirect("http://localhost:3000/member/snsreg?m_idx="+vo.getM_idx());
                        }
                     
                    }

                }catch(Exception e){
                    e.printStackTrace();
                }
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @RequestMapping("/snsreg/add")
    public Map<String, Object> snsRegNicknameAdd(String m_idx, String nickname){

        Map<String, Object> map = new HashMap<String, Object>();

        m_service.snsRegAdd(m_idx, nickname);

        MemVO mvo = m_service.nicknameChk(nickname);

        int chk = 1; //chk가 1이면 저장이 잘 된 것

        if(mvo == null)
            chk = 0;

        map.put("chk", chk);
        map.put("nickname", mvo.getNickname());
        map.put("id", mvo.getId());

        return map;
    }
    
    
}
