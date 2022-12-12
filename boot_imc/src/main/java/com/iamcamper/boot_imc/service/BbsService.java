package com.iamcamper.boot_imc.service;

import java.util.List;

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

    public BbsVO view(String b_idx) {

        BbsVO view = mapper.view(b_idx);

        return view;
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

    public void add(BbsVO vo) {
        mapper.add(vo);
    }

    public int totalCount(String bname) {

        int totalCount = mapper.totalCount(bname);

        return totalCount;

    }

    public int ViewCount(String b_idx) {
        return mapper.ViewCount(b_idx);
    }

}
