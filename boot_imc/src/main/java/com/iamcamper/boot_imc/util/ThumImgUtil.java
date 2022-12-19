package com.iamcamper.boot_imc.util;

public class ThumImgUtil {

    public static String thumImgUtil(String content){

        String str = "";
        String first_img = "<img";
        String img_close = ">";

        int begin = content.indexOf(first_img);
        int end = content. indexOf(img_close, begin);

        str = content.substring(begin, end+1); 

        return str;
    }
    
}
