package com.iamcamper.boot_imc.mapper;

import org.apache.ibatis.annotations.Param;

import com.iamcamper.boot_imc.VO.MemVO;

public interface MemMapper {
    MemVO login(@Param("id") String id, @Param("pw") String pw);
}
