package com.iamcamper.boot_imc.mapper;

import java.util.List;

import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.VO.LikeVO;

import feign.Param;

public interface LikeMapper {
    List<LikeVO> chklike(@Param("b_idx") Integer b_idx, @Param("m_idx") Integer m_idx);

    List<LikeVO> chkclike(@Param("c_idx") Integer c_idx, @Param("m_idx") Integer m_idx);

    void likeup(@Param("b_idx") Integer b_idx, @Param("m_idx") Integer m_idx);

    void likedel(@Param("b_idx") Integer b_idx, @Param("m_idx") Integer m_idx);

    void clikeup(@Param("c_idx") Integer c_idx, @Param("m_idx") Integer m_idx);

    void clikedel(@Param("c_idx") Integer c_idx, @Param("m_idx") Integer m_idx);

    void addlike(@Param("m_idx") Integer m_idx, @Param("b_idx") Integer b_idx);

    void addclike(@Param("m_idx") Integer m_idx, @Param("c_idx") Integer c_idx);

    int chk(@Param("b_idx") Integer b_idx, @Param("m_idx") Integer m_idx);

    int cchk(@Param("c_idx") Integer c_idx, @Param("m_idx") Integer m_idx);

}
