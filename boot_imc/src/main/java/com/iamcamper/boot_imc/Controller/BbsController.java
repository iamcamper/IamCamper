package com.iamcamper.boot_imc.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamcamper.boot_imc.VO.BbsVO;
import com.iamcamper.boot_imc.service.BbsService;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/bbs")
public class BbsController {

    @Autowired
    private BbsService b_Service;

    @RequestMapping("/free")
    public Map<String, Object> freeBbs() {

        String begin = "1";
        String end = "10";

        BbsVO[] ar = b_Service.list(begin, end);
        Map<String, Object> map = new HashMap<>();
        map.put("bbs_list", ar);

        return map;
    }

    @RequestMapping("/blist")
    public Map<String, Object> blist() {
        // 게시판 bname 정해지면 수정 할 곳!
        BbsVO[] ar = b_Service.blist("BBS");
        BbsVO[] ar2 = b_Service.blist("USED");
        Map<String, Object> map = new HashMap<>();
        map.put("blist", ar);
        map.put("ulist", ar2);

        return map;
    }

    @RequestMapping("/add")
    public Map<String, Object> addbbs() {
        Map<String, Object> map = new HashMap<String, Object>();

        return map;

    }
}