package com.iamcamper.boot_imc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.VO.CamVO;
import com.iamcamper.boot_imc.mapper.CamMapper;

@Service
public class CamService {

    @Autowired
    private CamMapper mapper;

    public boolean add(CamVO vo) {
        boolean chk = false;

        int i = mapper.AddData(vo);
        if (i > 0) {
            chk = true;
        }
        return chk;
    }

}
