# I AM CAMPER [ 자유로운 캠퍼들의 커뮤니티 ]
공공데이터 오픈 API를 기반으로 캠핑장에 관련된 정보와, 자유롭게 대화를 나눌 수 있는 각 카테고리별 커뮤니티,<br>
중고 거래 게시판 활성화를 목표로 제작된 INCREPAS 데이터 처리 기반 풀스택 과정 파이널 프로젝트입니다.

<br>

## 목차
- 개발 환경
  * 운영 체제 : Window10, MacOS12.1.2
  * 언어 : Java, HTML5, CSS, JavaScript
  * 프레임워크 : SpringBoot
  * 서버 : 
    * FrontEnd : Next.js
    * BackEnd : apache tomcat 8
  * 데이터베이스 : MySQL
  * 개발 툴 : Visual Studio Code
  * 라이브러리 : toast UI, material UI, Chart.js, Lombok
  
- DB 설계
  * 스키마 : iamcamper
  * 테이블 :
    * member (멤버 테이블)
    * bbs (게시판 테이블)
    * comment (댓글 테이블)
    * like (게시글 / 댓글 좋아요 테이블)
    * camping (캠핑 데이터 저장 테이블)
    * bbsdata (각 게시판 데이터 저장 테이블)
  ![db다이어그램](https://user-images.githubusercontent.com/102152166/209556778-67c34ce4-9f7e-48f6-8e04-109c102107cf.png)

- 사용한 공공데이터 및 오픈 API
  * 한국관광공사 - 고캠핑API
  * 카카오 맵
  * 카카오 로그인
  * 네이버 로그인
  * 구글 로그인
  
- 업무 분장
  * 이경재 : 네이버 로그인, 메인 페이지, 캠핑장 검색, 마이페이지(회원 정보 수정)
  * 이진재 : 카카오 로그인, 자유 게시판(캠핑, 맛집, 관광지, 자유), 중고 거래 게시판
  * 손유라 : 구글 로그인, 회원 로그인, 회원 가입, 어드민
  
  
