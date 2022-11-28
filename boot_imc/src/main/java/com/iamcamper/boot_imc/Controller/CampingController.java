package com.iamcamper.boot_imc.Controller;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamcamper.boot_imc.VO.CamVO;
import com.iamcamper.boot_imc.service.CamService;

@CrossOrigin(origins = "http://localhost:3000")

@RequestMapping("/cam")
@RestController
public class CampingController {

    @Autowired
    private CamService service;

    @RequestMapping("/update")
    public String Update() throws Exception {
        String a = "";
        StringBuffer sb = new StringBuffer();
        sb.append(
                "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=wBQmzgiBACZ1O%2FJ79%2FmqTep2O%2BGJZiXE2%2BHacF5l2epi%2FT4f1uh270dxEAiIzwstnzWTF74b6C%2BRli%2BRL4UlTQ%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=xml");
        URL url = new URL(sb.toString());

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.connect();

        SAXBuilder builder = new SAXBuilder();

        Document doc = builder.build(conn.getInputStream());

        Element root = doc.getRootElement();

        System.out.println(root.getName());
        Element body = root.getChild("body");

        // body 안에 있는 items라는 자식 요소를 구한다
        String tcnt = body.getChildText("totalCount");
        int total = Integer.parseInt(tcnt);
        int totalCount = (total / 100) + 1;
        int j = 0;
        for (int i = 0; i <= totalCount; i++) {

            String count = String.valueOf(i + 1);
            URL url2 = new URL(
                    "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=wBQmzgiBACZ1O%2FJ79%2FmqTep2O%2BGJZiXE2%2BHacF5l2epi%2FT4f1uh270dxEAiIzwstnzWTF74b6C%2BRli%2BRL4UlTQ%3D%3D&numOfRows=100&pageNo="
                            + count + "&MobileOS=ETC&MobileApp=AppTest&_type=xml");
            HttpURLConnection conn2 = (HttpURLConnection) url2.openConnection();
            conn2.connect();

            Document doc2 = builder.build(conn2.getInputStream());

            Element root2 = doc2.getRootElement();

            Element body2 = root2.getChild("body");
            Element items = body2.getChild("items");

            List<Element> item_list = items.getChildren("item");
            for (Element item : item_list) {
                j++;
                String idx = "";
                String title = item.getChildText("facltNm");
                String category = item.getChildText("induty");
                String addr = item.getChildText("addr1");
                String mapY = item.getChildText("mapY");
                String mapX = item.getChildText("mapX");
                String lunchtime = "";
                String explain = item.getChildText("lineIntro");
                String minutely = item.getChildText("intro");
                String facilities = item.getChildText("sbrsCl");
                String manner = item.getChildText("resveCL");
                String animal = item.getChildText("animalCmgCl");
                String image = item.getChildText("firstImageUrl");
                String tel = item.getChildText("tel");
                String page = item.getChildText("homepage");
                CamVO vo = new CamVO(idx, title, category, addr, mapY, mapX, explain, minutely, lunchtime, facilities,
                        manner, animal, image, tel, page);
                boolean chk = service.add(vo);
                System.out.println(chk);
            }

        }
        return a;
    }
}