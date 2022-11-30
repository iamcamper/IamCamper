package com.iamcamper.boot_imc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.mapper.AdminMapper;

@Service
public class AdminService {

    @Autowired
    AdminMapper mapper;


    //어드민 로그인 기능
    public MemVO AdminLogin(String id, String pw, String grade){
        
        MemVO mem = mapper.login(id, pw, grade);

        return mem;

    }

    //어드민 게시판의 토탈 카운트 불러오기
    public int totalCount(String bname){

        int totalCount = mapper.totalCount(bname);

        return totalCount;

    }

    //어드민 게시판의 게시글을 페이징 기법을 적용해서 가져오기
    public List<BbsVO> list(String bname, String begin, String end){

        List<BbsVO> list = mapper.list(bname, begin, end);

        return list;

    }

    //어드민 작성한 글 등록하기
    public void write(BbsVO vo){

        mapper.write(vo);
        
    }


    
}
