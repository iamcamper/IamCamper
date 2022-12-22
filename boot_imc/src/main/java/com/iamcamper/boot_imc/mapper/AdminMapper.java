package com.iamcamper.boot_imc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

import com.iamcamper.boot_imc.VO.BbsTotalCntVO;
import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.VO.RegCntVO;
import com.iamcamper.boot_imc.VO.SnsCountVO;

public interface AdminMapper {

    // admin 로그인
    MemVO login(@Param("id") String id, @Param("pw") String pw);

    // 게시판의 totalCount 구하기
    int totalCount(@Param("bname") String bname);

    // 페이징 기법을 적용해 게시글 가져오기
    List<BbsVO> list(@Param("bname") String bname, @Param("begin") String begin, @Param("end") String end);

    // 글쓰기
    void write(BbsVO vo);

    // 배너 게시판의 totalCount 구하기
    int bannerCount(@Param("bname1") String bname1, @Param("bname2") String bname2);

    // 배너 게시판 리스트 구하기
    List<BbsVO> bannerList(@Param("begin") String begin, @Param("end") String end, @Param("bname1") String bname,
            @Param("bname2") String bname2);

    // 클릭한 게시글 가져오기
    BbsVO views(@Param("b_idx") String b_idx);

    // 글 수정
    void bbsEdit(@Param("b_idx") String b_idx, @Param("subject") String subject, @Param("content") String content,
            @Param("file_name") String file_name, @Param("ori_name") String ori_name);

    // 조회수 증가
    void viewCount(@Param("b_idx") String b_idx);

    // 대시보드 - 오늘 가입한 회원 수
    int todayRegCount();

    // 대시보드 - 게시판별 게시글 전체 카운트
    List<BbsTotalCntVO> bbsTotalCnt();

    // 대시보드 - 최근 5일 회원 가입자 수
    List<RegCntVO> regCnt();

    // 대시보드 - 토탈 회원 수
    int memberCnt();

    // 검색한 글 리스트 페이징 기법으로 불러오기
    List<BbsVO> bbsList(@Param("category") String category, @Param("value") String value, @Param("begin") String begin,
            @Param("end") String end);

    // 검색한 글 토탈 카운트 불러오기
    int bbsCount(@Param("category") String category, @Param("value") String value);

    // 회원 게시판 게시글 삭제
    void bbsDel(String b_idx);

    // 회원 게시글 강제 삭제 여부 확인
    int bbsDelChk(String b_idx);

    // 어드민 회원 가입
    void adminReg(@Param("id") String id, @Param("pw") String pw, @Param("nickname") String nickname,
            @Param("name") String name, @Param("email") String email, @Param("birth") String birth,
            @Param("phone") String phone);

    // 어드민 회원 가입 여부 검사
    int adminRegChk(String id);

    // 어드민 회원 가입 리스트
    List<MemVO> adminRegList();

    // 게시글이 가장 많이 올라온 게시판 상위 1개
    BbsTotalCntVO bestBbs();

    // 어드민 회원 승인
    void approve(String m_idx);

    // 어드민 회원 승인 여부
    MemVO approveChk(String m_idx);

    // 메인페이지 배너 불러오기
    List<BbsVO> BannerMain();

    // 어드민 글 삭제
    void del(String b_idx);

    // 어드민 글 삭제 검증
    int delChk(String b_idx);

    // 어드민 대시보드 어제 가입자 
    int yRegCnt();

    // 어드민 대시보드 소셜 별 회원 가입
    List<SnsCountVO> snsCount();
}
