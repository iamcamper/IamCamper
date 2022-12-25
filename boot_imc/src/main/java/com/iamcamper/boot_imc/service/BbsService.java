package com.iamcamper.boot_imc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.mapper.BbsMapper;

@Service
public class BbsService {
    @Autowired
    private BbsMapper mapper;

    public List<BbsVO> list(String begin, String end, String bname) {

        List<BbsVO> list = mapper.list(begin, end, bname);

        return list;

    }

    public void fixbbs(String subject, String content, String file_name, String ori_name, String bname, String price,
            String b_idx) {
        mapper.edit(subject, content, file_name, ori_name, bname, price, b_idx);
    }

    public BbsVO view(String b_idx) {

        BbsVO view = mapper.view(b_idx);

        return view;
    }

    public BbsVO subChk(String subject) {
        return mapper.subchk(subject);
    }

    public BbsVO del(String b_idx) {
        BbsVO del = mapper.del(b_idx);

        return del;
    }

    public BbsVO[] blist(String bname) {
        List<BbsVO> list = mapper.blist(bname);
        BbsVO[] ar = null;
        if (list != null && list.size() > 0) {
            ar = new BbsVO[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    public BbsVO[] blist2(String bname1, String bname2, String bname3,String bname4) {
        Map<String, String> map = new HashMap<>();

        map.put("bname1", bname1);
        map.put("bname2", bname2);
        map.put("bname3", bname3);
        map.put("bname3", bname4);

        List<BbsVO> list = mapper.blist2(map);
        BbsVO[] ar = null;
        if (list != null && list.size() > 0) {
            ar = new BbsVO[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    public void add(BbsVO vo) {
        mapper.add(vo);
    }

    public int totalCount(String bname) {

        int totalCount = mapper.totalCount(bname);

        return totalCount;

    }

    public void ViewCount(String b_idx) {
        mapper.ViewCount(b_idx);
    }

    public List<BbsVO> searchResult(String bname, String value, String search, String begin, String end) {
        return mapper.searchlist(bname, value, search, begin, end);
    }

    public int searchCount(String bname, String way, String search) {
        return mapper.searchCount(bname, way, search);
    }

}
