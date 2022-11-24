package com.iamcamper.boot_imc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.mapper.BbsMapper;

@Service
public class BbsService {
    @Autowired
    private BbsMapper mapper;

    public BbsVO[] list(String begin, String end) {
        List<BbsVO> list = mapper.list(begin, end);
        BbsVO[] ar = null;
        if (list != null && list.size() > 0) {
            ar = new BbsVO[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

}
