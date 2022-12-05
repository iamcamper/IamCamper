package com.iamcamper.boot_imc.VO;

import lombok.Data;

@Data
public class GoogleOAuthResponseVO {
    //응답을 받을 모델
    private String accessToken;
    private String refreshToken;
    private String expiresIn;
    private String scope;
    private String tokenType;
    private String idToken;

}
