package com.iamcamper.boot_imc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.VO.BbsTotalCntVO;
import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.VO.RegCntVO;
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

    //어드민 배너 토탈 카운트 불러오기
    public int bannerCount(String bname1, String bname2){

        int count = mapper.bannerCount(bname1, bname2);

        return count;
    }

    //어드민 배너 전체 리스트 불러오기
    public List<BbsVO> bannerList(String begin, String end, String bname1, String bname2){

        return mapper.bannerList(begin, end, bname1, bname2);
        
    }

    //어드민 클릭한 게시글 불러오기
    public BbsVO views(String b_idx){

        return mapper.views(b_idx);
        
    }

    //어드민 글 수정
    public void bbsEdit(String b_idx, String subject, String content, String file_name, String ori_name){

        mapper.bbsEdit(b_idx, subject, content, file_name, ori_name);

    }

    //어드민 조회수 증가
    public void viewCount (String b_idx){

        mapper.viewCount(b_idx);

    }

    //오늘 가입한 회원 수 가져오기
    public int todayRegCount(){

        return mapper.todayRegCount();

    }

    //게시판별 오늘의 게시글 전체 카운트 가져오기
    public List<BbsTotalCntVO> bbsTotalCnt(){

        return mapper.bbsTotalCnt();

    }

    //게시판별 최근 5일 회원가입자
    public List<RegCntVO> regCnt(){

        return mapper.regCnt();

    }

    //전체 멤버 수
    public int memberCnt(){

        return mapper.memberCnt();

    }
    
}
