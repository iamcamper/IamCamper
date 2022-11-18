package com.iamcamper.boot_imc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.mapper.MemMapper;

@Service
public class MemService {

    @Autowired
    private MemMapper mapper;

    public MemVO login(String id, String pw) {
        return mapper.login(id, pw);
    }
}
