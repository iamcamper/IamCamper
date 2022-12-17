package com.iamcamper.boot_imc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.VO.MemVO;

public interface AdminMapper {

    // admin 로그인
    MemVO login(@Param("id") String id, @Param("pw") String pw, @Param("grade") String grade);
    
    // 게시판의 totalCount 구하기
    int totalCount(@Param("bname")String bname);

    // 페이징 기법을 적용해 게시글 가져오기
    List<BbsVO> list(@Param("bname") String bname, @Param("begin") String begin, @Param("end") String end);

    // 글쓰기
    void write(BbsVO vo);

    // 배너 게시판의 totalCount 구하기
    int bannerCount(@Param("bname1") String bname1, @Param("bname2") String bname2);

    // 배너 게시판 리스트 구하기
    List<BbsVO> bannerList(@Param("begin") String begin, @Param("end") String end, @Param("bname1") String bname, @Param("bname2") String bname2);

    // 클릭한 게시글 가져오기
    BbsVO views(@Param("b_idx") String b_idx);

    // 글 수정
    void bbsEdit(@Param("b_idx") String b_idx, @Param("subject") String subject, @Param("content") String content, 
        @Param("file_name") String file_name, @Param("ori_name") String ori_name);

    //조회수 증가
    void viewCount(@Param("b_idx") String b_idx);

    //오늘 가입한 회원 수
    int todayRegCount();
}
