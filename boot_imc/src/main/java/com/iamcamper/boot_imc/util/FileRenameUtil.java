package com.iamcamper.boot_imc.util;

import java.io.File;

public class FileRenameUtil {

    public static String checkSameFileName(String fileName, String path){

        int period = fileName.lastIndexOf(".");

        String f_name = fileName.substring(0, period);

        String suffix = fileName.substring(period);

        String saveFileName = path + System.getProperty("file.separatof") + fileName;

        File file = new File(saveFileName);

        int idx = 1;

        while(file != null && file.exists()) {
            StringBuffer sb = new StringBuffer();
            sb.append(f_name);
            sb.append(idx++);
            sb.append(suffix);

            fileName = sb.toString();

            saveFileName = path + System.getProperty("file.separator") + fileName;

            file = new File(saveFileName);
        }

        return fileName;
    }
    
}
