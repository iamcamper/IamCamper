package com.iamcamper.boot_imc.VO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemVO {
    private String m_idx, nickname, id, pw, email, name, birth, phone, snsAuth, snsId, snsNickname, snsByear;
    private Integer manner_point, activate, grade;
}
