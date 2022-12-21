package com.iamcamper.boot_imc.Controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.codec.binary.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.iamcamper.boot_imc.VO.BbsTotalCntVO;
import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.VO.RegCntVO;
import com.iamcamper.boot_imc.service.AdminService;
import com.iamcamper.boot_imc.util.FileRenameUtil;
import com.iamcamper.boot_imc.util.Paging;
import com.iamcamper.boot_imc.util.ThumImgUtil;

@RestController
@RequestMapping("/admin")
@CrossOrigin(originPatterns = "http://localhost:3000")
public class AdminBbsController {

    @Autowired
    private AdminService a_service;

    @Autowired
    private HttpServletRequest req;

    @Autowired
    private HttpServletResponse res;

    String img_path = "/Users/yura/ReactTest/work/IamCamper/next_imc/public/upload_img";
    String file_path = "/Users/yura/ReactTest/work/IamCamper/next_imc/public/upload_file";

    /*
     * 공지사항 리스트 불러오기
     */
    @RequestMapping("/notice/list")
    public Map<String, Object> noticeList(@RequestParam("bname") String bname, @RequestParam("cPage") String cPage) {

        Paging page = new Paging();

        Map<String, Object> map = new HashMap<String, Object>();

        int totalCount = a_service.totalCount(bname);

        page.setTotalCount(totalCount);

        if (cPage.length() > 0) {
            page.setNowPage(Integer.parseInt(cPage));
        } else {
            page.setNowPage(1);
        }

        String begin = String.valueOf(page.getBegin());
        String end = String.valueOf(page.getEnd());

        List<BbsVO> list = a_service.list(bname, begin, end);

        BbsVO[] b_list = null;
        if (list != null && list.size() > 0) {
            b_list = new BbsVO[list.size()];
            list.toArray(b_list);
        }

        map.put("list", b_list);
        map.put("totalPage", page.getTotalPage());

        return map;

    }

    /*
     * 비동기식 통신으로 에디터에 이미지 업로드하기
     */
    @RequestMapping("/upload_img")
    public Map<String, Object> uploadImg(@RequestPart(value = "file", required = true) MultipartFile file) {

        Map<String, Object> map = new HashMap<String, Object>();

        String fname = null;
        if (file.getSize() > 0) {
            fname = file.getOriginalFilename();
            fname = FileRenameUtil.checkSameFileName(fname, img_path);

            try {
                file.transferTo(new File(img_path, fname));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        map.put("fname", fname);

        return map;
    }

    /*
     * 게시글 저장하기
     */
    @RequestMapping("/writeok")
    public Map<String, Object> writeOk(@RequestPart(value = "nickname") String nickname,
            @RequestPart(value = "subject") String subject, String content, String bname,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        Map<String, Object> map = new HashMap<String, Object>();

        BbsVO vo = new BbsVO();

        if (file != null) {

            String ori_name = null;
            String file_name = null;

            if (file.getSize() > 0) {
                ori_name = file.getOriginalFilename();
                file_name = FileRenameUtil.checkSameFileName(ori_name, file_path);

                try {
                    file.transferTo(new File(file_path, file_name));
                } catch (Exception e) {
                    e.printStackTrace();
                }

                vo.setOri_name(ori_name);
                vo.setFile_name(file_name);

            }
        }

        vo.setIp(req.getRemoteAddr());
        vo.setSubject(subject);
        vo.setNickname(nickname);
        vo.setContent(content);
        vo.setBname(bname);

        a_service.write(vo);

        return map;

    }

    /*
     * 배너 리스트 불러오기
     */
    @RequestMapping("/banner/list")
    public Map<String, Object> bannerList(String cPage, String bname1, String bname2) {

        Map<String, Object> map = new HashMap<String, Object>();

        Paging page = new Paging();

        int count = a_service.bannerCount(bname1, bname2);

        page.setTotalCount(count);

        if (cPage.length() > 0) {
            page.setNowPage(Integer.parseInt(cPage));
        } else {
            page.setNowPage(1);
        }

        String begin = String.valueOf(page.getBegin());
        String end = String.valueOf(page.getEnd());

        List<BbsVO> list = a_service.bannerList(begin, end, bname1, bname2);

        BbsVO[] b_list = null;
        if (list.size() > 0) {
            b_list = new BbsVO[list.size()];
            list.toArray(b_list);
        }

        map.put("list", b_list);
        map.put("totalPage", page.getTotalPage());

        return map;
    }

    /*
     * 해당 게시글 불러오기
     */
    @RequestMapping("/views/data")
    public Map<String, Object> views(String b_idx) {

        Map<String, Object> map = new HashMap<String, Object>();

        BbsVO bvo = a_service.views(b_idx);

        readCount(req, b_idx, res);

        map.put("data", bvo);

        return map;

    }

    /*
     * 어드민 글 수정하기 전 원 내용 불러오기
     */
    @RequestMapping("/edit/data")
    public Map<String, Object> editData(String b_idx) {

        Map<String, Object> map = new HashMap<String, Object>();

        BbsVO bvo = a_service.views(b_idx);

        map.put("data", bvo);

        return map;

    }

    /*
     * 게시글 수정
     */
    @RequestMapping("/edit/ok")
    public Map<String, Object> editOk(@RequestPart(value = "subject") String subject, String content,
            @RequestPart(value = "file", required = false) MultipartFile file, String b_idx) {

        Map<String, Object> map = new HashMap<String, Object>();

        String ori_name = null;
        String file_name = null;

        if (file != null) {
            ori_name = file.getOriginalFilename();
            file_name = FileRenameUtil.checkSameFileName(ori_name, file_path);

            try {
                file.transferTo(new File(file_path, file_name));
            } catch (Exception e) {
                e.printStackTrace();
            }

        }

        a_service.bbsEdit(b_idx, subject, content, file_name, ori_name);

        return map;

    }

    /*
     * 조회수 중복 방지 메서드
     */

    public void readCount(HttpServletRequest req, String b_idx, HttpServletResponse res) {

        Cookie cookies[] = req.getCookies();
        Cookie oldCookie = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("view")) {
                    oldCookie = cookie;
                }
            }
        }

        if (oldCookie != null) {
            if (!oldCookie.getValue().contains("[" + b_idx + "]")) {
                a_service.viewCount(b_idx);
                oldCookie.setValue(oldCookie.getValue() + "_[" + b_idx + "]");
                oldCookie.setPath("/");
                oldCookie.setMaxAge(60 * 60 * 24);
                res.addCookie(oldCookie);
            }
        } else {
            a_service.viewCount(b_idx);
            Cookie newCookie = new Cookie("view", "[" + b_idx + "]");
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 24);
            res.addCookie(newCookie);
        }

    }

    /*
     * 대시보드 데이터
     */
    @RequestMapping("/main/data")
    public Map<String, Object> getDashData() {

        Map<String, Object> map = new HashMap<String, Object>();

        // 오늘 가입한 회원 수 가져오기
        int todayReg = a_service.todayRegCount();
        // 전체 가입한 회원 수 가져오기
        int totalReg = a_service.memberCnt();

        // 오늘 게시판 글 수 가져오기
        List<BbsTotalCntVO> todayBbsCountList = a_service.bbsTotalCnt();
        BbsTotalCntVO[] b_total_list = null;
        if (todayBbsCountList.size() > 0) {
            b_total_list = new BbsTotalCntVO[todayBbsCountList.size()];
            todayBbsCountList.toArray(b_total_list);
        }

        // 베스트 게시판 가져오기
        BbsTotalCntVO bestBbs = a_service.bestBbs();

        // 최근 5일 가입자 수 가져오기
        List<RegCntVO> regList = a_service.regCnt();
        RegCntVO[] r_list = null;
        if (regList.size() > 0) {
            r_list = new RegCntVO[regList.size()];
            regList.toArray(r_list);
        }

        map.put("bestBbs", bestBbs);
        map.put("bbsTotalCntList", b_total_list);
        map.put("regList", r_list);
        map.put("todayReg", todayReg);
        map.put("totalReg", totalReg);

        return map;

    }

    /*
     * 어드민 - 게시판 관리 검색
     */
    @RequestMapping("/bbs/search")
    public Map<String, Object> bbsList(String category, String value, String cPage) {

        Map<String, Object> map = new HashMap<>();

        Paging page = new Paging();

        System.out.println(value);

        int totalCount = a_service.bbsCount(category, value);

        page.setTotalCount(totalCount);

        if (cPage.length() > 0) {
            page.setNowPage(Integer.parseInt(cPage));
        } else {
            page.setNowPage(1);
        }

        String begin = String.valueOf(page.getBegin());
        String end = String.valueOf(page.getEnd());

        List<BbsVO> list = a_service.bbsList(category, value, begin, end);

        BbsVO[] b_list = null;

        if (list.size() > 0) {
            b_list = new BbsVO[list.size()];
            list.toArray(b_list);
        }

        map.put("b_list", b_list);
        map.put("totalPage", page.getTotalPage());

        return map;

    }

    /*
     * 어드민 - 게시판 관리 글 삭제
     */
    @RequestMapping("/bbs/del")
    public Map<String, Object> bbsDel(String b_idx) {

        Map<String, Object> map = new HashMap<String, Object>();

        a_service.bbsDel(b_idx);

        int chk = a_service.bbsDelChk(b_idx);

        map.put("chk", chk);

        return map;

    }

    /*
     * 어드민 - 회원 가입
     */
    @RequestMapping("/reg/ok")
    public Map<String, Object> adminReg(String id, String pw, String nickname,
            String name, String email, String phone, String birth) {

        Map<String, Object> map = new HashMap<String, Object>();

        a_service.adminReg(id, pw, nickname, name, email, birth, phone);

        int chk = a_service.adminRegChk(id);

        map.put("chk", chk);

        return map;

    }

    /*
     * 어드민 - 회원 가입자 중 승인 전 리스트
     */
    @RequestMapping("/reg/list")
    public Map<String, Object> adminRegList() {

        Map<String, Object> map = new HashMap<String, Object>();

        List<MemVO> list = a_service.adminRegList();
        MemVO[] m_list = null;

        if (list.size() > 0) {
            m_list = new MemVO[list.size()];
            list.toArray(m_list);
        }

        map.put("list", m_list);

        return map;

    }

    @RequestMapping("/reg/approve")
    public Map<String, Object> regApprove(String m_idx) {

        Map<String, Object> map = new HashMap<String, Object>();

        a_service.approve(m_idx);

        MemVO mvo = a_service.approveChk(m_idx);

        int chk = 0;

        if (mvo == null) {
            chk = 1;
        }

        map.put("chk", chk);

        return map;

    }

}