package com.iamcamper.boot_imc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.mapper.AdminMapper;

@Service
public class AdminService {

    @Autowired
    AdminMapper mapper;

    public MemVO AdminLogin(String id, String pw, String grade){
        
        MemVO mem = mapper.login(id, pw, grade);

        return mem;

    }
    
}
