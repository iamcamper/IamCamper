package com.iamcamper.boot_imc.Controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.VO.CamVO;
import com.iamcamper.boot_imc.VO.CommVO;
import com.iamcamper.boot_imc.VO.LikeVO;
import com.iamcamper.boot_imc.service.BbsService;
import com.iamcamper.boot_imc.service.CamService;
import com.iamcamper.boot_imc.service.CommService;
import com.iamcamper.boot_imc.service.LikeService;
import com.iamcamper.boot_imc.util.FileRenameUtil;
import com.iamcamper.boot_imc.util.Paging;
import com.iamcamper.boot_imc.util.ThumImgUtil;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/bbs")
public class BbsController {

    @Autowired
    private CommService c_Service;

    @Autowired
    private BbsService b_Service;

    @Autowired
    private CamService cam_Service;

    @Autowired
    private HttpServletRequest req;

    @Autowired
    private HttpServletResponse res;

    String img_path = "C:/ProJect/IamCamper/IamCamper/next_imc/public/upload_img";
    String file_path = "C:/ProJect/IamCamper/IamCamper/next_imc/public/upload_file";
    String thum_path = "/upload_img/";

    @RequestMapping(value = "/list")
    public Map<String, Object> freeBbs(@RequestParam("bname") String bname, @RequestParam("cPage") String cPage) {

        Paging page = new Paging();

        Map<String, Object> map = new HashMap<String, Object>();

        int totalCount = b_Service.totalCount(bname);
        System.out.println(totalCount);

        page.setNumPerPage(9);
        page.setTotalCount(totalCount);

        if (cPage.length() > 0) {
            page.setNowPage(Integer.parseInt(cPage));
        } else {
            page.setNowPage(1);
        }

        String begin = String.valueOf(page.getBegin());
        String end = String.valueOf(page.getEnd());

        List<BbsVO> list = b_Service.list(begin, end, bname);

        BbsVO[] b_list = null;
        if (list != null && list.size() > 0) {
            b_list = new BbsVO[list.size()];
            list.toArray(b_list);
        }

        map.put("list", b_list);
        map.put("totalPage", page.getTotalPage());

        return map;

    }

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
                b_Service.ViewCount(b_idx);
                oldCookie.setValue(oldCookie.getValue() + "_[" + b_idx + "]");
                oldCookie.setPath("/");
                oldCookie.setMaxAge(60 * 60 * 24);
                res.addCookie(oldCookie);
            }
        } else {
            b_Service.ViewCount(b_idx);
            Cookie newCookie = new Cookie("view", "[" + b_idx + "]");
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 24);
            res.addCookie(newCookie);
        }

    }

    @RequestMapping("/search")
    public Map<String, Object> Result(String bname, String way, String search, String cPage) {
        Map<String, Object> map = new HashMap<>();

        Paging page = new Paging();

        System.out.println(bname);
        System.out.println(way);
        System.out.println(search);

        int totalCount = b_Service.searchCount(bname, way, search);

        page.setTotalCount(totalCount);

        if (cPage.length() > 0) {
            page.setNowPage(Integer.parseInt(cPage));
        } else {
            page.setNowPage(1);
        }

        String begin = String.valueOf(page.getBegin());
        String end = String.valueOf(page.getEnd());

        List<BbsVO> list = b_Service.searchResult(bname, way, search, begin, end);
        System.out.println("list" + list);
        BbsVO[] b_list = null;

        if (list.size() > 0) {
            b_list = new BbsVO[list.size()];
            list.toArray(b_list);
        }
        System.out.println("b_list:" + b_list);
        map.put("list", b_list);
        map.put("totalPage", page.getTotalPage());

        return map;
    }

    @RequestMapping("/commList")
    public Map<String, Object> freeComm(@RequestParam String b_idx) {
        Map<String, Object> map = new HashMap<String, Object>();

        List<CommVO> list = c_Service.list(b_idx);

        CommVO[] c_list = null;
        if (list != null && list.size() > 0) {
            c_list = new CommVO[list.size()];
            list.toArray(c_list);
        }
        map.put("clist", c_list);

        return map;
    }

    @RequestMapping("/commAdd")
    public Map<String, Object> addComm(String nickname, String content, String b_idx) {
        Map<String, Object> map = new HashMap<String, Object>();

        System.out.println(nickname);
        System.out.println(content);
        System.out.println(b_idx);
        CommVO vo = new CommVO();

        vo.setIp(req.getRemoteAddr());
        vo.setNickname(nickname);
        vo.setContent(content);
        vo.setB_idx(b_idx);

        c_Service.addAns(vo);

        return map;
    }

    // 메인 페이지 베스트 글 + 오늘 추천 픽
    @RequestMapping("/blist")
    public Map<String, Object> blist() {

        int ren = (int) (Math.random() * 3000 + 1);

        BbsVO[] ar = b_Service.blist2("CAMREVIEW", "TSREVIEW", "RESTREVIEW");
        BbsVO[] ar2 = b_Service.blist("RESELL");
        CamVO[] ar3 = cam_Service.picklist(ren);
        BbsVO[] ar4 = null;
        Map<String, Object> map = new HashMap<>();
        map.put("blist", ar);
        map.put("ulist", ar2);
        map.put("plist", ar3);

        return map;
    }

    @RequestMapping("/addbbs")
    public Map<String, Object> addBbs(String nickname, String subject, String content, String bname, String price,
            @RequestPart(value = "file", required = false) MultipartFile file, String thum_img) {

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
        String img_start = "/upload_img/";
        String img_close = "contenteditable";

        int begin = content.indexOf(img_start);
        int end = content.indexOf(img_close, begin - 1);
        if (begin > 0 & end > 0) {
            String thum = content.substring(begin, end - 2);
            vo.setThum_img(thum);
        } else if (begin <= 0 & end <= 0) {
            String thum = "/upload_img/no-image.png";
            vo.setThum_img(thum);
        }

        vo.setIp(req.getRemoteAddr());
        vo.setSubject(subject);
        vo.setNickname(nickname);
        vo.setContent(content);
        vo.setBname(bname);
        vo.setPrice(price);

        b_Service.add(vo);

        return map;

    }

    @RequestMapping("/fixbbs/submit")
    public Map<String, Object> editOk(String subject, String content,
            @RequestPart(value = "file", required = false) MultipartFile file, String bname, String price,
            String b_idx) {

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

        b_Service.fixbbs(subject, content, file_name, ori_name, bname, price, b_idx);

        return map;

    }

    @RequestMapping("/upload_img")
    public Map<String, Object> uploadImg(@RequestPart(value = "file", required = false) MultipartFile file) {
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
        System.out.println(img_path);
        System.out.println(fname);
        map.put("fname", fname);

        return map;
    }

    @RequestMapping("/view")
    public BbsVO viewBbs(String b_idx) {
        BbsVO vo = b_Service.view(b_idx);

        readCount(req, b_idx, res);

        return vo;
    }

    @RequestMapping("/del")
    public BbsVO delBbs(String b_idx) {
        BbsVO vo = b_Service.del(b_idx);

        return vo;
    }

}