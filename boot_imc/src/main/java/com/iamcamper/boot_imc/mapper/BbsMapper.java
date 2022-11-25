package com.iamcamper.boot_imc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.iamcamper.boot_imc.VO.BbsVO;

public interface BbsMapper {
    List<BbsVO> list(@Param("begin") String begin, @Param("end") String end);

    List<BbsVO> blist(String bname);
}
