package com.iamcamper.boot_imc.mapper;

import java.util.List;

import com.iamcamper.boot_imc.VO.LikeVO;

import feign.Param;

public interface LikeMapper {
    List<LikeVO> chklike(@Param("b_idx")Integer b_idx, @Param("m_idx")Integer m_idx);

    List<LikeVO> chkclike(@Param("c_idx")Integer c_idx, @Param("m_idx")Integer m_idx);

    void likeup(Integer b_idx, Integer m_idx);

    void likedel(Integer b_idx, Integer m_idx);

    void clikeup(Integer c_idx, Integer m_idx);

    void clikedel(Integer c_idx, Integer m_idx);

    void addlike(Integer m_idx, Integer b_idx);

    void addclike(Integer m_idx, Integer c_idx);

    int chk(@Param("b_idx") Integer b_idx,@Param("m_idx")Integer m_idx);

    int cchk(@Param("c_idx")Integer c_idx,@Param("m_idx")Integer m_idx);
}
