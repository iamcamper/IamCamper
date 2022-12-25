package com.iamcamper.boot_imc.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.junit.runners.Parameterized.Parameters;

import com.iamcamper.boot_imc.VO.BbsVO;

public interface BbsMapper {
    List<BbsVO> list(@Param("begin") String begin, @Param("end") String end, @Param("bname") String bname);

    List<BbsVO> blist(String bname);

    List<BbsVO> blist2(Map<String, String> map);

    List<BbsVO> searchlist(@Param("bname") String bname, @Param("way") String way, @Param("search") String search,
            @Param("begin") String begin, @Param("end") String end);

    int searchCount(@Param("bname") String bname, @Param("way") String way, @Param("search") String search);

    void edit(String subject, String content, String file_name, String ori_name, String bname, String price,
            String b_idx, String status);

    BbsVO del(String b_idx);

    BbsVO view(String b_idx);

    void add(BbsVO vo);

    int totalCount(@Param("bname") String bname);

    void ViewCount(String b_idx);

    void like(@Param("b_idx") Integer b_idx);

    BbsVO subchk(@Param("subject") String subject);

    void Buystat(String status, String b_idx);
}
