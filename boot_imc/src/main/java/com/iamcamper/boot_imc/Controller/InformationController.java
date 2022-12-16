package com.iamcamper.boot_imc.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.service.InformationService;

@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
@RequestMapping("/member")
public class InformationController {

    @Autowired
    InformationService i_Service;

    // -----------------------------회원 정보 변경 관련-----------------------------
    @RequestMapping("/Information")
    public Map<String, Object> getData(String m_idx) {

        Map<String, Object> map = new HashMap<String, Object>();

        MemVO vo = i_Service.getData(m_idx);

        map.put("vo", vo);

        return map;
    }

    @RequestMapping("/add/nickname")
    public Map<String, Object> addnickname(String m_idx, String nickname) {

        Map<String, Object> map = new HashMap<>();

        int chk = 0;

        if (m_idx != null && nickname != null) {

            chk = i_Service.c_Nickname(m_idx, nickname);

            map.put("chk", chk);

        }

        return map;
    }

    @RequestMapping("/add/email")
    public int addemail(String m_idx, String email) {
        int chk = 0;

        if (m_idx != null && email != null) {

            chk = i_Service.c_Emaul(m_idx, email);

        }

        return chk;
    }

    @RequestMapping("/add/phone")
    public int addphone(String m_idx, String phone) {

        int chk = 0;

        if (m_idx != null && phone != null) {

            chk = i_Service.c_phone(m_idx, phone);
        }

        return chk;
    }

    @RequestMapping("/add/pwd")
    public int addpwd(String m_idx, String pwd, String pwd2) {

        int chk = 0;
        int chk2 = 0;

        if (m_idx != null && pwd != null && pwd2 != null) {
            chk = i_Service.chk_pw(m_idx, pwd2);

            if (chk == 1) {
                chk2 = i_Service.c_pw(m_idx, pwd);
            }
        }
        return chk2;
    }

    // 회원 탈퇴 관련

    @RequestMapping("/chk/pwd")
    public int chkpwd(String m_idx, String pwd) {

        int chk = 0;
        int chk2 = 0;

        if (m_idx != null && pwd != null) {
            chk = i_Service.chk_pw(m_idx, pwd);
            if (chk == 1) {
                chk2 = i_Service.leave(m_idx);
            }
        }
        return chk2;
    }

    @RequestMapping("/del/pwd")
    public int delpwd(String m_idx) {

        int chk = 0;

        if (m_idx != null) {

            chk = i_Service.leave(m_idx);
        }
        System.out.println(chk);
        return chk;

    }
}
