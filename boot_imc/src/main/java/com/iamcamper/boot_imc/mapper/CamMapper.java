package com.iamcamper.boot_imc.mapper;

import java.util.List;
import java.util.Map;

import com.iamcamper.boot_imc.VO.CamVO;

public interface CamMapper {

    int AddData(CamVO vo);

    Boolean del(String cname);

    List<CamVO> clist(Map<String, String> map);

    List<CamVO> alist(String addr);

    List<CamVO> allList(String addr);

    List<CamVO> P_clist(Map<String, String> map);

    List<CamVO> P_alist(Map<String, String> map);

    List<CamVO> P_allList(Map<String, String> map);

    List<CamVO> pick_list(Map<String, String> map);

    List<CamVO> search_m(String title);

}