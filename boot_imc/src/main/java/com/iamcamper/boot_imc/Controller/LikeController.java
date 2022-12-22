package com.iamcamper.boot_imc.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.el.ListELResolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamcamper.boot_imc.VO.LikeVO;
import com.iamcamper.boot_imc.service.LikeService;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/like")
public class LikeController {

    @Autowired
    private LikeService l_Service;

    @RequestMapping("/chk")
    public Map<String, Object> First(Integer b_idx, Integer m_idx) {
        Map<String, Object> map = new HashMap<String, Object>();

        int cnt = l_Service.Fchk(b_idx, m_idx);

        map.put("cnt", cnt);

        return map;
    }

    @RequestMapping("/cchk")
    public Map<String, Object> CFirst(Integer c_idx, Integer m_idx) {
        Map<String, Object> map = new HashMap<String, Object>();

        int cnt = l_Service.FCchk(c_idx, m_idx);

        map.put("ccnt", cnt);

        return map;
    }

    @RequestMapping("/up")
    public void Up(Integer b_idx, Integer m_idx) {

        int cnt = l_Service.Fchk(b_idx, m_idx);

        if (cnt == 0) {
            l_Service.Addlike(m_idx, b_idx);
            l_Service.likeup(b_idx);
        } else {
            l_Service.Likeup(b_idx, m_idx);
        }
    }

    @RequestMapping("/dw")
    public void Down(Integer b_idx, Integer m_idx) {
        l_Service.Likedel(b_idx, m_idx);
    }

    @RequestMapping("/cup")
    public void Cup(Integer c_idx, Integer m_idx) {

        int cnt = l_Service.FCchk(c_idx, m_idx);

        if (cnt == 0) {
            l_Service.Addclike(m_idx, c_idx);
        } else {
            l_Service.CLikeup(c_idx, m_idx);
        }
    }

    @RequestMapping("/cdw")
    public void Cdw(Integer c_idx, Integer m_idx) {
        l_Service.CLikedel(c_idx, m_idx);
    }
}
