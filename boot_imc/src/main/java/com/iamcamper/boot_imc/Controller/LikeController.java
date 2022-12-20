package com.iamcamper.boot_imc.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamcamper.boot_imc.service.LikeService;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/like")
public class LikeController {

    @Autowired
    private LikeService l_Service;

    @RequestMapping("/up")
    public void Up(String b_idx, String m_idx) {
        int cnt = l_Service.Chklike(b_idx, m_idx);
        if (cnt == 0) {
            l_Service.Addlike(m_idx, b_idx);
        } else {
            l_Service.Likeup(b_idx, m_idx);
        }
    }

    @RequestMapping("/dw")
    public void Down(String b_idx, String m_idx) {
        l_Service.Likedel(b_idx, m_idx);
    }

    @RequestMapping("/cup")
    public void Cup(String c_idx, String m_idx) {
        int cnt = l_Service.Chkclike(c_idx, m_idx);

        if (cnt == 0) {
            l_Service.Addclike(m_idx, c_idx);
        } else {
            l_Service.CLikeup(c_idx, m_idx);
        }
    }

    @RequestMapping("/cdw")
    public void Cdw(String c_idx, String m_idx) {
        l_Service.CLikedel(c_idx, m_idx);
    }
}
