package com.iamcamper.boot_imc.Controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.VO.CommVO;
import com.iamcamper.boot_imc.service.BbsService;
import com.iamcamper.boot_imc.service.CommService;
import com.iamcamper.boot_imc.util.FileRenameUtil;
import com.iamcamper.boot_imc.util.Paging;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/bbs")
public class BbsController {

    @Autowired
    private CommService c_Service;

    @Autowired
    private BbsService b_Service;

    @Autowired
    private HttpServletRequest req;

    String img_path = "C:/ProJect/IamCamper/IamCamper/next_imc/public/upload_img";
    String file_path = "C:/ProJect/IamCamper/IamCamper/next_imc/public/upload_file";

    @RequestMapping(value = "/list")
    public Map<String, Object> freeBbs(@RequestParam("bname") String bname, @RequestParam("cPage") String cPage) {

        Paging page = new Paging();

        Map<String, Object> map = new HashMap<String, Object>();

        int totalCount = b_Service.totalCount(bname);

        page.setTotalCount(totalCount);

        if (cPage != null) {
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

    @RequestMapping("/blist")
    public Map<String, Object> blist() {
        // 게시판 bname 정해지면 수정 할 곳!
        BbsVO[] ar = b_Service.blist2("CAMREVIEW", "TSREVIEW", "RESTREVIEW");
        BbsVO[] ar2 = b_Service.blist("RESELL");
        Map<String, Object> map = new HashMap<>();
        map.put("blist", ar);
        map.put("ulist", ar2);

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
                vo.setThum_img(file_path);
            }
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

        map.put("fname", fname);

        return map;
    }

    @RequestMapping("/view")
    public BbsVO viewBbs(String b_idx) {
        BbsVO vo = b_Service.view(b_idx);

        return vo;
    }

    @RequestMapping("/fixbbs")
    public void fixBbs() {

    }

    @RequestMapping("/del")
    public BbsVO delBbs(String b_idx) {
        BbsVO vo = b_Service.del(b_idx);

        return vo;
    }

}