package com.iamcamper.boot_imc.mapper;

import java.util.List;

import com.iamcamper.boot_imc.VO.CommVO;

public interface CommMapper {

    List<CommVO> commList(String b_idx);

}
