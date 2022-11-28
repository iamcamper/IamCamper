package com.iamcamper.boot_imc.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.service.AdminService;
import com.iamcamper.boot_imc.util.Paging;

@RestController
@RequestMapping("/admin")
@CrossOrigin(originPatterns = "http://localhost:3000")
public class AdminBbsController {

    @Autowired
    private AdminService a_service;
    
    @RequestMapping("/notice/list")
    public Map<String, Object> noticeList(@RequestParam("bname") String bname, @RequestParam("cPage") String cPage){

        Paging page = new Paging();

        Map<String, Object> map = new HashMap<String, Object>();

        int totalCount = a_service.totalCount(bname);

        page.setTotalCount(totalCount);

        System.out.println("123123123123123123123");

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
 
        return map;
        
    }
}
