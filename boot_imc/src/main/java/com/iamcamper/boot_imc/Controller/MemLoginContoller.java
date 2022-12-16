package com.iamcamper.boot_imc.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.service.MemService;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/member")
public class MemLoginContoller {

    @Autowired
    private MemService m_service;

    @RequestMapping("/login/chk")
    public Map<String, Object> localLogin(String id, String pw) {

        Map<String, Object> map = new HashMap<String, Object>();

        int chk = 0;
        MemVO mvo = m_service.login(id, pw);

        if (mvo != null) {
            chk = 1;
        }

        map.put("user", mvo);
        map.put("chk", chk);

        return map;

    }

    @RequestMapping("/id/chk")
    public Map<String, Object> idChk(String id) {

        Map<String, Object> map = new HashMap<String, Object>();

        MemVO mvo = m_service.idChk(id);
        int chk = 0;

        if (mvo != null) {
            // 아이디가 중복되었다면 1 반환
            chk = 1;
        }

        map.put("chk", chk);

        return map;
    }

    /*
     * 닉네임 중복 체크
     */
    @RequestMapping("/nickname/chk")
    public Map<String, Object> nicknameChk(String nickname) {

        Map<String, Object> map = new HashMap<String, Object>();

        MemVO mvo = m_service.nicknameChk(nickname);
        int chk = 0;

        if (mvo != null) {
            chk = 1;
        }

        map.put("chk", chk);

        return map;
    }

    @RequestMapping("/reg/ok")
    public Map<String, Object> registration(String id, String pw, String nickname,
            String name, String email, String phone, String birth) {

        Map<String, Object> map = new HashMap<String, Object>();

        m_service.reg(id, pw, nickname, name, email, birth, phone);

        MemVO mvo = m_service.idChk(id);

        int chk = 0;

        if (mvo == null) {
            chk = 1;
        }

        map.put("chk", chk);

        return map;
    }

}
