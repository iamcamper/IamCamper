package com.iamcamper.boot_imc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.VO.LikeVO;
import com.iamcamper.boot_imc.mapper.LikeMapper;

@Service
public class LikeService {
    @Autowired
    private LikeMapper mapper;

    public void Likeup(Integer b_idx, Integer m_idx) {
         mapper.likeup(b_idx, m_idx);
    }

    public void Likedel(Integer b_idx, Integer m_idx) {
         mapper.likedel(b_idx, m_idx);
    }

    public void CLikeup(Integer c_idx, Integer m_idx) {
         mapper.clikeup(c_idx, m_idx);
    }

    public void CLikedel(Integer c_idx, Integer m_idx) {
         mapper.clikedel(c_idx, m_idx);
    }

    public List<LikeVO> Chklike(Integer b_idx, Integer m_idx) {
                return mapper.chklike(b_idx, m_idx);
    }

    public List<LikeVO> Chkclike(Integer c_idx, Integer m_idx) {
        return mapper.chkclike(c_idx, m_idx);
    }

    public void Addlike(Integer m_idx, Integer b_idx) {
        mapper.addlike(m_idx, b_idx);
    }

    public void Addclike(Integer m_idx, Integer c_idx) {
        mapper.addclike(m_idx, c_idx);
    }
    public int Fchk(Integer b_idx, Integer m_idx){
        return mapper.chk(b_idx, m_idx);
    }
    public int FCchk(Integer c_idx, Integer m_idx){
        return mapper.cchk(c_idx, m_idx);
    }
}
