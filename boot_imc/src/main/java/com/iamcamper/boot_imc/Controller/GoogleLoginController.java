package com.iamcamper.boot_imc.Controller;

import java.net.URI;
import java.net.http.HttpHeaders;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.iamcamper.boot_imc.Config.ConfigUtils;
import com.iamcamper.boot_imc.VO.GoogleOAuthRequestVO;
import com.iamcamper.boot_imc.VO.GoogleOAuthResponseVO;
import com.iamcamper.boot_imc.util.RestTemplateErrorHandler;

@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
public class GoogleLoginController {

    private String authUrl = "https://oauth2.googleapis.com";
    private String loginBaseUrl = "https://accounts.google.com";
    private String redirectUri = "http://localhost:8080/sns/googlelogin/res";
    private String clientId = "25322370333-cb2fvvk7l92c7086hv503n657oa2fadg.apps.googleusercontent.com";
    private String secret = "25322370333-cb2fvvk7l92c7086hv503n657oa2fadg.apps.googleusercontent.com";


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

    @RequestMapping("/sns/googlelogin/res")
    public Map<String, Object> googleLogin(@RequestParam(value="code") String code) throws Exception {

        Map <String, Object> map = new HashMap<String, Object>();

        
    }
    
    
}
