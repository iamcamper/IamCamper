package com.iamcamper.boot_imc.mapper;

import com.iamcamper.boot_imc.VO.CamVO;

public interface CamMapper {

    int AddData(CamVO vo);

    Boolean del(String cname);

}