package com.iamcamper.boot_imc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.VO.CommVO;
import com.iamcamper.boot_imc.mapper.CommMapper;

@Service
public class CommService {
    @Autowired
    private CommMapper mapper;

    public List<CommVO> list(String b_idx) {
        List<CommVO> list = mapper.commList(b_idx);

        return list;
    }

    public void addAns(CommVO vo) {
        mapper.addAns(vo);
    }
}
