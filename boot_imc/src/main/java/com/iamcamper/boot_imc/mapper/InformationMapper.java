package com.iamcamper.boot_imc.mapper;

import com.iamcamper.boot_imc.VO.MemVO;

import feign.Param;

public interface InformationMapper {

    MemVO Information(String m_idx);

    int c_nickname(@Param("m_idx") String m_idx, @Param("nickname") String nickname);

    int c_email(@Param("m_idx") String m_idx, @Param("email") String email);

    int c_phone(@Param("m_idx") String m_idx, @Param("phone") String phone);

    MemVO chk_pw(@Param("m_idx") String m_idx, @Param("pw") String pw);

    int c_pw(@Param("m_idx") String m_idx, @Param("pw") String pw);

    int leave(String m_idx);
}
