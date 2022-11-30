package com.iamcamper.boot_imc.VO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CamVO {
    private String idx, title, category, mapX, mapY, addr, explain, minutely, lunchtime, facilities, manner, animal,
            image, tel, page, cname;
}