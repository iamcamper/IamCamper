package com.iamcamper.boot_imc.Controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.iamcamper.boot_imc.VO.GoogleOAuthRequestVO;
import com.iamcamper.boot_imc.VO.GoogleOAuthResponseVO;
import com.iamcamper.boot_imc.util.RestTemplateErrorHandler;

@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
public class GoogleLoginController {

    private String authUrl = "https://oauth2.googleapis.com/token";
    private String loginBaseUrl = "https://accounts.google.com";
    private String redirectUri = "http://localhost:8080/sns/googlelogin/callback";
    private String clientId = "25322370333-cb2fvvk7l92c7086hv503n657oa2fadg.apps.googleusercontent.com";
    private String secret = "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";


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

    @RequestMapping("/sns/googlelogin/callback")
    public Map<String, Object> googleLogin(@RequestParam(value="code") String code, HttpServletResponse res) throws Exception {

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

                        //db저장
                     
                    }

                }catch(Exception e){
                    e.printStackTrace();
                }
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }

        return map;

    }
    
    
}
