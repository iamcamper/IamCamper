package com.iamcamper.boot_imc.mapper;

import java.util.List;

import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.VO.LikeVO;

import feign.Param;

public interface LikeMapper {
    
    void likeup(@Param("b_idx") Integer b_idx, @Param("m_idx") Integer m_idx);

    void likedel(@Param("b_idx") Integer b_idx, @Param("m_idx") Integer m_idx);

    void addlike(@Param("m_idx") Integer m_idx, @Param("b_idx") Integer b_idx);

    int chk(@Param("b_idx") Integer b_idx, @Param("m_idx") Integer m_idx);

}
