package com.iamcamper.boot_imc.VO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BbsVO {
    private String subject, nickname, content, file_name, ori_name, thum_img, write_date, bname, ip,
            b_idx, hit, like, status, price, bnameko;
    private List<CommVO> c_list;
}
