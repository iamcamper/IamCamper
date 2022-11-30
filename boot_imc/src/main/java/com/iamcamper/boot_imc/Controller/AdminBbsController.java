package com.iamcamper.boot_imc.Controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.service.AdminService;
import com.iamcamper.boot_imc.util.FileRenameUtil;
import com.iamcamper.boot_imc.util.Paging;

@RestController
@RequestMapping("/admin")
@CrossOrigin(originPatterns = "http://localhost:3000")
public class AdminBbsController {

    @Autowired
    private AdminService a_service;

    @Autowired
    private HttpServletRequest req;

    String img_path = "/Users/yura/ReactTest/work/IamCamper/next_imc/public/upload_img";
    
    /*
     * 공지사항 리스트 불러오기
     */
    @RequestMapping("/notice/list")
    public Map<String, Object> noticeList(@RequestParam("bname") String bname, @RequestParam("cPage") String cPage){

        Paging page = new Paging();

        Map<String, Object> map = new HashMap<String, Object>();

        int totalCount = a_service.totalCount(bname);

        page.setTotalCount(totalCount);

        if(cPage != null) {
            page.setNowPage(Integer.parseInt(cPage));
        } else {
            page.setNowPage(1);
        }

        String begin = String.valueOf(page.getBegin());
        String end = String.valueOf(page.getEnd());
        
        List<BbsVO> list = a_service.list(bname, begin, end);

        BbsVO [] b_list = null;
        if(list != null && list.size()>0){
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
    public Map<String, Object> uploadImg(@RequestPart(value="file", required = true) MultipartFile file){

        Map<String, Object> map = new HashMap<String, Object>();

        String fname = null;
        if(file.getSize() > 0) {
            fname = file.getOriginalFilename();
            fname = FileRenameUtil.checkSameFileName(fname, img_path);

            try{
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
    public Map<String, Object> writeOk(String nickname, String subject, String content, String bname){

        Map<String, Object> map = new HashMap<String, Object>();

        BbsVO vo = new BbsVO();

        vo.setIp(req.getRemoteAddr());
        vo.setSubject(subject);
        vo.setNickname(nickname);
        vo.setContent(content);
        vo.setBname(bname);

        a_service.write(vo);

        return map;

    }
}
