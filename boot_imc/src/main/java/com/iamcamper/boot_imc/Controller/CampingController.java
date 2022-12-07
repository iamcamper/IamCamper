package com.iamcamper.boot_imc.Controller;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamcamper.boot_imc.VO.CamVO;
import com.iamcamper.boot_imc.service.CamService;
import com.iamcamper.boot_imc.util.Paging;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/cam")
@RestController
public class CampingController {

    @Autowired
    private CamService service;

    Paging page = new Paging();

    @RequestMapping("/getData")
    public Map<String, CamVO[]> getData(String addr, String category, String cPage) {

        Map<String, CamVO[]> map = new HashMap<String, CamVO[]>();

        CamVO[] m_vo = service.getList(addr, category);

        int totalCount = m_vo.length;

        page.setTotalCount(totalCount);

        page.setNumPerPage(3);

        if (cPage != null) {
            page.setNowPage(Integer.parseInt(cPage));
        } else {
            page.setNowPage(1);
        }

        String begin = String.valueOf(page.getBegin());
        String end = String.valueOf(page.getEnd());

        CamVO[] p_vo = service.getP_list(addr, category, begin, end);

        map.put("vo", m_vo);
        map.put("pvo", p_vo);

        return map;
    }

    @RequestMapping("/update1")
    public String Update1() throws Exception {// 캠핑 업데이트

        boolean del = service.del("캠핑");
        System.out.println("del:" + del);
        String API_URL = "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=wBQmzgiBACZ1O%2FJ79%2FmqTep2O%2BGJZiXE2%2BHacF5l2epi%2FT4f1uh270dxEAiIzwstnzWTF74b6C%2BRli%2BRL4UlTQ%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=xml";
        URL url = new URL(API_URL);

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.connect();

        SAXBuilder builder = new SAXBuilder();

        Document doc = builder.build(conn.getInputStream());

        Element root = doc.getRootElement();

        System.out.println(root.getName());
        Element body = root.getChild("body");

        String tcnt = body.getChildText("totalCount");

        int totalCount = (int) Math.ceil(Integer.parseInt(tcnt) / 100);

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
                String manner = item.getChildText("resveCl");
                String animal = item.getChildText("animalCmgCl");
                String image = item.getChildText("firstImageUrl");
                String tel = item.getChildText("tel");
                String page = item.getChildText("homepage");
                String cname = "캠핑";
                CamVO vo = new CamVO(idx, title, category, addr, mapY, mapX, explain, minutely, lunchtime, facilities,
                        manner, animal, image, tel, page, cname);

                boolean chk = service.add(vo);
            }
        }
        System.out.println("저장완료");
        return "저장완료";
    }

    @RequestMapping("/update2")
    public String Update2() throws Exception {

        boolean del = service.del("병원");
        System.out.println("del:" + del);
        String a = "성공";
        StringBuffer sb = new StringBuffer();
        String API_URL = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncFullDown?" +
                "serviceKey=wBQmzgiBACZ1O%2FJ79%2FmqTep2O%2BGJZiXE2%2BHacF5l2epi%2FT4f1uh270dxEAiIzwstnzWTF74b6C%2BRli%2BRL4UlTQ%3D%3D"
                + "&pageNo=1" + "&numOfRows=100";
        URL url = new URL(API_URL);

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.connect();

        SAXBuilder builder = new SAXBuilder();

        Document doc = builder.build(conn.getInputStream());

        Element root = doc.getRootElement();

        System.out.println(root.getName());
        Element body = root.getChild("body");

        String tcnt = body.getChildText("totalCount");

        int totalCount = (int) Math.ceil(Integer.parseInt(tcnt) / 1000);

        System.out.println(totalCount);

        for (int i = 0; i <= totalCount; i++) {

            String count = String.valueOf(i + 1);
            URL url2 = new URL(
                    "http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncFullDown?" +
                            "serviceKey=wBQmzgiBACZ1O%2FJ79%2FmqTep2O%2BGJZiXE2%2BHacF5l2epi%2FT4f1uh270dxEAiIzwstnzWTF74b6C%2BRli%2BRL4UlTQ%3D%3D"
                            + "&pageNo=" + count + "&numOfRows=1000");
            HttpURLConnection conn2 = (HttpURLConnection) url2.openConnection();
            conn2.connect();

            Document doc2 = builder.build(conn2.getInputStream());

            Element root2 = doc2.getRootElement();

            Element body2 = root2.getChild("body");
            Element items = body2.getChild("items");

            List<Element> item_list = items.getChildren("item");
            for (Element item : item_list) {
                String idx = "";
                String title = item.getChildText("dutyName");
                String category = "병원";
                String addr = item.getChildText("dutyAddr");
                String mapY = item.getChildText("wgs84Lat");
                String mapX = item.getChildText("wgs84Lon");
                String lunchtime = item.getChildText("dutyEtc");
                String explain = item.getChildText("dutyEmclsName");
                String minutely = "";
                String facilities = "";
                String manner = "";
                String animal = "";
                String image = "";
                String tel = item.getChildText("dutyTel1");
                String page = "";
                String cname = "병원";
                CamVO vo = new CamVO(idx, title, category, addr, mapY, mapX, explain,
                        minutely, lunchtime, facilities,
                        manner, animal, image, tel, page, cname);
                boolean chk = service.add(vo);

            }

        }
        System.out.println("저장완료");

        return "저장완료";
    }

    @RequestMapping("/update3")
    public String Update3() throws Exception {
        // 기존 데이터 삭제
        boolean del = service.del("약국");
        // ----------API 자료 받기---------
        String API_URL = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyFullDown?serviceKey=wBQmzgiBACZ1O%2FJ79%2FmqTep2O%2BGJZiXE2%2BHacF5l2epi%2FT4f1uh270dxEAiIzwstnzWTF74b6C%2BRli%2BRL4UlTQ%3D%3D&pageNo=wBQmzgiBACZ1O%2FJ79%2FmqTep2O%2BGJZiXE2%2BHacF5l2epi%2FT4f1uh270dxEAiIzwstnzWTF74b6C%2BRli%2BRL4UlTQ%3D%3D&numOfRows=10";

        URL url = new URL(API_URL);

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.connect();

        SAXBuilder builder = new SAXBuilder();

        Document doc = builder.build(conn.getInputStream());

        Element root = doc.getRootElement();

        Element body = root.getChild("body");

        String tcnt = body.getChildText("totalCount");
        int totalCount = (int) Math.ceil(Integer.parseInt(tcnt) / 1000);
        System.out.println(totalCount);
        int j = 0;
        for (int i = 0; i <= totalCount; i++) {

            String count = String.valueOf(i + 1);
            URL url2 = new URL(
                    "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyFullDown"
                            + "?serviceKey=wBQmzgiBACZ1O%2FJ79%2FmqTep2O%2BGJZiXE2%2BHacF5l2epi%2FT4f1uh270dxEAiIzwstnzWTF74b6C%2BRli%2BRL4UlTQ%3D%3D"
                            + "&pageNo=" + count
                            + "&numOfRows=1000");
            HttpURLConnection conn2 = (HttpURLConnection) url2.openConnection();

            conn2.connect();

            Document doc2 = builder.build(conn2.getInputStream());

            Element root2 = doc2.getRootElement();

            Element body2 = root2.getChild("body");

            Element items = body2.getChild("items");

            List<Element> item_list = items.getChildren("item");
            for (Element item : item_list) {
                String idx = "";
                String title = item.getChildText("dutyName");
                String category = "약국";
                String addr = item.getChildText("dutyAddr");
                String mapY = item.getChildText("wgs84Lat");
                String mapX = item.getChildText("wgs84Lon");
                String lunchtime = "";
                String explain = item.getChildText("dutyMapimg");
                String minutely = "";
                String facilities = "";
                String manner = "";
                String animal = "";
                String image = "";
                String tel = item.getChildText("dutyTel1");
                String page = "";
                String cname = "약국";
                // ----------API 자료 받기---------
                // ------------DB저장--------------
                CamVO vo = new CamVO(idx, title, category, addr, mapY, mapX, explain,
                        minutely, lunchtime, facilities,
                        manner, animal, image, tel, page, cname);

                boolean chk = service.add(vo);
                // ------------DB저장--------------
                System.out.println(j++);
            }

        }
        System.out.println("저장완료");

        return "저장완료";
    }
}