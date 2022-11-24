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

@RestController
@RequestMapping("/sns")
public class MemController {

    @Autowired
    private MemService m_Service;

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

    @ResponseBody
    @GetMapping("/kakaologin")
    public void kakaoCall(@RequestParam String code) {
        String access_Token = m_Service.getKakaoAccessToken(code);

        m_Service.UserKakaoLogin(access_Token);

    }

    @ResponseBody
    @RequestMapping("/kakaologout")
    public String logout(HttpSession session) {
        m_Service.UserKakaoLogout((String) session.getAttribute("access_Token"));
        session.removeAttribute("access_Token");
        session.removeAttribute("userId");

        return "index";
    }

}
