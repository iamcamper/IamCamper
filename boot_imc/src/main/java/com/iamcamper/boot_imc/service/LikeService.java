package com.iamcamper.boot_imc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.VO.LikeVO;
import com.iamcamper.boot_imc.mapper.BbsMapper;
import com.iamcamper.boot_imc.mapper.LikeMapper;

@Service
public class LikeService {
    @Autowired
    private LikeMapper mapper;

    @Autowired
    private BbsMapper bmap;

    public void Likeup(Integer b_idx, Integer m_idx) {
        mapper.likeup(b_idx, m_idx);
    }

    public void Likedel(Integer b_idx, Integer m_idx) {
        mapper.likedel(b_idx, m_idx);
    }
    public void Addlike(Integer m_idx, Integer b_idx) {
        mapper.addlike(m_idx, b_idx);
    }
    public int Fchk(Integer b_idx, Integer m_idx) {
        return mapper.chk(b_idx, m_idx);
    }
    public void likeup(Integer b_idx) {
        bmap.like(b_idx);
    }
    
}
