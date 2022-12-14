
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

    void reg(@Param("id") String id, @Param("pw") String pw, @Param("nickname") String nickname, 
        @Param("name") String name, @Param("email") String email, @Param("birth") String birth, @Param("phone") String phone); //회원 가입
    
    MemVO googleChk(@Param("snsId") String snsId, @Param("auth") String auth); //구글 로그인 중복 확인

    void googleReg(@Param("snsId") String snsId, @Param("snsAuth") String snsAuth, 
        @Param("name") String name, @Param("email") String email); //구글 로그인 닉네임 받기 전 초기 db 저장

    MemVO googleRegChk(@Param("snsId") String snsId, @Param("snsAuth") String snsAuth); //닉네임이 저장 안 된 grade가 9인 레코드 검색

    void snsRegAdd(@Param("m_idx") String m_idx, @Param("nickname") String nickname); //닉네임 업데이트문
}

