package com.iamcamper.boot_imc.util;

public class Paging {

    int nowPage = 1;
    //현재 페이지

    int numPerPage = 10;
    //한 페이지에 보여져야 할 게시물의 수

    int totalCount = 0;
    //총 게시물의 수

    int pagePerBlock = 5;
    //페이지 묶음

    int totalPage = 0;
    //전체 페이지 수 (totalCount를 알아야 구할 수 있음)

    int begin;
    //한 페이지에서 시작될 글 번호

    int end;
    //한 페이지에서 끝날 글 번호

    int startPage;
    //페이지 블럭에서 시작하는 페이지

    int endPage;
    //페이지 블럭에서 끝나는 페이지

    public Paging(){}

    public Paging (int numPerPage, int pagePerBlock){
        this.numPerPage = numPerPage;
        this.pagePerBlock = pagePerBlock;
    }

    public int getNowPage() {
        return nowPage;
    }

    public void setNowPage(int nowPage) {
        if(nowPage > totalPage) {
            nowPage = totalPage;
        }

        begin = (nowPage-1)*numPerPage+1;
        end = nowPage*numPerPage;

        startPage = ((nowPage-1)/pagePerBlock)*pagePerBlock+1;
        endPage = startPage+pagePerBlock-1;

        if(endPage > totalPage){
            endPage = totalPage;
        }
    }

    public int getNumPerPage() {
        return numPerPage;
    }

    public void setNumPerPage(int numPerPage) {
        this.numPerPage = numPerPage;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        totalPage = (int)Math.ceil((double)totalCount/numPerPage);
    }

    public int getPagePerBlock() {
        return pagePerBlock;
    }

    public void setPagePerBlock(int pagePerBlock) {
        this.pagePerBlock = pagePerBlock;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getBegin() {
        return begin;
    }

    public void setBegin(int begin) {
        this.begin = begin;
    }

    public int getEnd() {
        return end;
    }

    public void setEnd(int end) {
        this.end = end;
    }

    public int getStartPage() {
        return startPage;
    }

    public void setStartPage(int startPage) {
        this.startPage = startPage;
    }

    public int getEndPage() {
        return endPage;
    }

    public void setEndPage(int endPage) {
        this.endPage = endPage;
    }

}
