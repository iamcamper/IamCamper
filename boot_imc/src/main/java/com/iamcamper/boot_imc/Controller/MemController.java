package com.iamcamper.boot_imc.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.service.MemService;

@CrossOrigin(originPatterns = "http://localhost:3000")

@RestController
@RequestMapping("/mem")
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

}
