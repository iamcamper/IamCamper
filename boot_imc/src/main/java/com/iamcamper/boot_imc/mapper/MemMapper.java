package com.iamcamper.boot_imc.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.iamcamper.boot_imc.VO.MemVO;

public interface MemMapper {
    MemVO login(@Param("id") String id, @Param("pw") String pw); // 일반 로그인

    MemVO kakaologin(Object snsId);

    int kakaoinsert(Map<String, Object> userInfo);

    MemVO idChk(@Param("id") String id); // 회원가입 아이디 중복 확인

    MemVO nicknameChk(@Param("nickname") String nickname); //회원가입 닉네임 중복 확인
}
