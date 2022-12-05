package com.iamcamper.boot_imc.VO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GoogleOAuthRequestVO {
    //구글 로그인 요청을 받을 모델
    private String redirectUri; //구글 로그인 후 redirect 위치
    private String clientId; //클라이언트 아이디
    private String clientSecret; //클라이언트 비밀번호
    private String code;
    private String responseType; //인증 코드를 반환하는지 여부
    private String scope; //OAuth 동의 범위
    private String accessType; //사용자가 브라우저에 없을 시 새로고침 여부
    private String grantType;
    private String state;
    private String includeGrantedScopes;
    private String loginHint;
    private String prompt;
}
