package com.iamcamper.boot_imc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.mapper.InformationMapper;

@Service
public class InformationService {

    @Autowired
    InformationMapper iMapper;;

    public MemVO getData(String m_idx) {

        MemVO vo = iMapper.Information(m_idx);

        return vo;
    }

    public int c_Nickname(String m_idx, String nickname) {

        int chk = iMapper.c_nickname(m_idx, nickname);

        return chk;
    }

    public int c_Emaul(String m_idx, String email) {

        int chk = iMapper.c_email(m_idx, email);

        return chk;
    }

    public int c_phone(String m_idx, String phone) {

        int chk = iMapper.c_phone(m_idx, phone);

        return chk;
    }

    public int chk_pw(String m_idx, String pw) {

        int chk = 0;

        MemVO vo = iMapper.chk_pw(m_idx, pw);

        if (vo != null) {
            chk = 1;
        }

        return chk;
    }

    public int c_pw(String m_idx, String pwd) {
        int chk = iMapper.c_pw(m_idx, pwd);
        return chk;
    }

    public int leave(String m_idx) {
        int chk = iMapper.leave(m_idx);
        return chk;
    }
}
