package com.iamcamper.boot_imc.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.service.AdminService;

@RestController
@RequestMapping("/admin/login")
@CrossOrigin(originPatterns = "http://localhost:3000")
public class AdminLoginController {

    @Autowired
    private AdminService a_service;

    @RequestMapping("/chk")
    public Map<String, Object> login(String id, String pw, String grade){

        MemVO mvo = a_service.AdminLogin(id, pw, grade);
        int chk = 0;
        if(mvo != null) {
            chk = 1;
        }
        Map<String, Object> adminMap = new HashMap<String, Object>();
        adminMap.put("chk", chk);
        adminMap.put("admin", mvo);

        return adminMap;

    }
}
