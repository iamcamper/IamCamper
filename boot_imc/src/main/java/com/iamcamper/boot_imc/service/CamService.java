package com.iamcamper.boot_imc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.VO.CamVO;
import com.iamcamper.boot_imc.mapper.CamMapper;

@Service
public class CamService {

    @Autowired
    private CamMapper mapper;

    public boolean add(CamVO vo) {
        boolean chk = false;

        int i = mapper.AddData(vo);
        if (i > 0) {
            chk = true;
        }
        return chk;
    }

    public boolean del(String cname) {

        boolean i = mapper.del(cname);

        return i;
    }

    public CamVO[] getList(String addr, String category) {
        Map<String, String> map = new HashMap<String, String>();
        List<CamVO> list = null;

        if (category.equals("애완동물")) {
            list = mapper.alist(addr);
        } else if (category.equals("전체보기")) {
            System.out.println(addr);
            list = mapper.allList(addr);
        } else {
            map.put("addr", addr);
            map.put("category", category);
            list = mapper.clist(map);
        }

        CamVO[] vo = null;

        if (list != null && list.size() > 0) {
            vo = new CamVO[list.size()];
            list.toArray(vo);
        }
        return vo;
    }

    public CamVO[] getP_list(String addr, String category, String begin, String end) {
        Map<String, String> map = new HashMap<String, String>();
        List<CamVO> list = null;

        map.put("addr", addr);

        map.put("category", category);
        map.put("begin", begin);
        map.put("end", end);
        if (category.equals("애완동물")) {
            list = mapper.P_alist(map);
        } else if (category.equals("전체보기")) {
            list = mapper.P_allList(map);
        } else {
            list = mapper.P_clist(map);
        }
        CamVO[] vo = null;

        if (list != null && list.size() > 0) {
            vo = new CamVO[list.size()];
            list.toArray(vo);
        }
        return vo;
    }

    public CamVO[] picklist(int begin) {

        Map<String, String> map = new HashMap<String, String>();
        String b = String.valueOf(begin);
        String e = String.valueOf(begin + 2);

        map.put("begin", b);
        map.put("end", e);

        CamVO[] vo = null;

        List<CamVO> list = mapper.pick_list(map);

        if (list != null && list.size() > 0) {
            vo = new CamVO[list.size()];
            list.toArray(vo);
        }

        return vo;

    }

    public CamVO[] search_m(String title) {

        CamVO[] vo = null;

        List<CamVO> list = mapper.search_m(title);

        if (list != null && list.size() > 0) {
            vo = new CamVO[list.size()];
            list.toArray(vo);
        }
        return vo;
    }
}
