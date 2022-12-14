package com.iamcamper.boot_imc.Controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.iamcamper.boot_imc.VO.MemVO;
import com.iamcamper.boot_imc.service.MemService;

@RestController
@RequestMapping("/sns")
public class MemController {

    @Autowired
    private MemService m_Service;

    @Autowired
    private HttpServletResponse response;

    @ResponseBody
    @GetMapping("/kakaologin")
    public void kakaoCall(@RequestParam String code) {
        String access_Token = m_Service.getKakaoAccessToken(code);

        String reqURL = "https://kapi.kakao.com/v2/user/me";

        // access_token을 이용하여 사용자 정보 조회
        try {

            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + access_Token); // 전송할 header 작성, access_token전송

            // 결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode); // sysout(삭제예정)

            // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result); // sysout(삭제예정)

            // Gson 라이브러리로 JSON파싱
            JSONParser pars = new JSONParser();
            Object obj = pars.parse(result.toString());
            JSONObject jobj = (JSONObject) obj;

            JSONObject kakao_acc = (JSONObject) jobj.get("kakao_account");
            JSONObject prop = (JSONObject) jobj.get("properties");

            String snsId = String.valueOf(jobj.get("id"));
            String email = (String) jobj.get("email");
            String name = (String) prop.get("nickname");
            String snsAuth = "kakao";

            MemVO mvo = m_Service.kakaologin(snsId, "kakao");
            MemVO mvo2 = m_Service.kakaoChk(snsId, snsAuth);

            if (mvo != null) {

                String nickname = URLEncoder.encode(mvo.getNickname(), "UTF-8");

                response.sendRedirect(
                        "http://localhost:3000/member/login?id=" + mvo.getSnsId() + "&nickname=" + nickname);

            } else if (mvo2 != null) {

                response.sendRedirect("http://localhost:3000/member/snsreg?m_idx=" + mvo2.getM_idx());

            } else {

                m_Service.kakaoinsert(snsId, snsAuth, email, name);

                MemVO vo = m_Service.kakaoChk(snsId, snsAuth);

                StringBuffer buffer = new StringBuffer("http://localhost:3000/member/snsreg?b_idx=");
                buffer.append(vo.getM_idx());

                response.sendRedirect("http://localhost:3000/member/snsreg?m_idx=" + vo.getM_idx());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @RequestMapping("/snsreg/add")
    public Map<String, Object> snsRegNicknameAdd(String m_idx, String nickname) {

        Map<String, Object> map = new HashMap<String, Object>();

        m_Service.snsRegAdd(m_idx, nickname);

        MemVO mvo = m_Service.nicknameChk(nickname);

        int chk = 1; // chk가 1이면 저장이 잘 된 것

        if (mvo == null)
            chk = 0;

        map.put("chk", chk);
        map.put("nickname", mvo.getNickname());
        map.put("id", mvo.getId());

        return map;
    }

}
