package com.iamcamper.boot_imc.VO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommVO {
    String nickname, content, ip, write_date,
            c_idx, b_idx, like, status;
}
