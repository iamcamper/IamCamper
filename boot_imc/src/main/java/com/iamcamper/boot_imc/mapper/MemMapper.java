package com.iamcamper.boot_imc.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.iamcamper.boot_imc.VO.MemVO;

public interface MemMapper {
    MemVO login(@Param("id") String id, @Param("pw") String pw); // 일반 로그인

    MemVO kakaologin(Object snsId);

    int kakaoinsert(Map<String, Object> userInfo);
}
