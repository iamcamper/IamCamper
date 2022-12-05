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
@RequestMapping("/mem")
public class MemLoginContoller {

    @Autowired
    private MemService m_service;

    @RequestMapping("/login/chk")
    public Map<String, Object> localLogin(String id, String pw){

        Map<String, Object> map = new HashMap<String, Object>();

        int chk = 0;
        MemVO mvo = m_service.login(id, pw);

        if(mvo != null){
            chk = 1;
        }

        map.put("user", mvo);
        map.put("chk", chk);
        
        return map;

    }
}
