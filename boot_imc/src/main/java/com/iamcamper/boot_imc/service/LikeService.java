package com.iamcamper.boot_imc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.mapper.LikeMapper;

@Service
public class LikeService {
    @Autowired
    private LikeMapper mapper;

    public int Likeup(String b_idx, String m_idx) {
        return mapper.likeup(b_idx, m_idx);
    }

    public int Likedel(String b_idx, String m_idx) {
        return mapper.likedel(b_idx, m_idx);
    }

    public int CLikeup(String c_idx, String m_idx) {
        return mapper.clikeup(c_idx, m_idx);
    }

    public int CLikedel(String c_idx, String m_idx) {
        return mapper.clikedel(c_idx, m_idx);
    }

    public int Chklike(String b_idx, String m_idx) {
        return mapper.chklike(b_idx, m_idx);
    }

    public int Chkclike(String c_idx, String m_idx) {
        return mapper.chkclike(c_idx, m_idx);
    }

    public void Addlike(String m_idx, String b_idx) {
        mapper.addlike(m_idx, b_idx);
    }

    public void Addclike(String m_idx, String c_idx) {
        mapper.addclike(m_idx, c_idx);
    }
}
