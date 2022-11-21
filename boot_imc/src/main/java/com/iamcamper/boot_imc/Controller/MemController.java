package com.iamcamper.boot_imc.Controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.service.MemService;
import com.iamcamper.boot_imc.service.authService;

@RestController
@RequestMapping("/mem")
public class MemController {

    @Autowired
    private MemService m_Service;
    @Autowired
    private HttpSession session;

    @RequestMapping("/login")
    public Map<String, Object> login(String id, String pw) {
        MemVO mvo = m_Service.login(id, pw);
        int chk = 0;
        if (mvo != null)
            chk = 1;
        Map<String, Object> resMap = new HashMap<>();
        resMap.put("chk", chk);
        resMap.put("user", mvo);

        return resMap;
    }

    @Autowired
    private authService a_kakao;

    @ResponseBody
    @GetMapping("/kakao")
    public String kakaoCall(@RequestParam String code) {
        String access_Token = a_kakao.getKakaoAccessToken(code);
        HashMap<String, Object> userInfo = a_kakao.createKakaoUser(access_Token);
        System.out.println("login Controller : " + userInfo);

        // 클라이언트의 이메일이 존재할 때 세션에 해당 이메일과 토큰 등록
        if (userInfo.get("email") != null) {
            session.setAttribute("userId", userInfo.get("email"));
            session.setAttribute("access_Token", access_Token);
        }
        return "/mem/kakao";
    }
}
