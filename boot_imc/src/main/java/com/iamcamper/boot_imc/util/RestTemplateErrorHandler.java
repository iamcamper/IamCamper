package com.iamcamper.boot_imc.util;

import java.io.IOException;

import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.ResponseErrorHandler;

public class RestTemplateErrorHandler implements ResponseErrorHandler {

    @Override
    public void handleError(ClientHttpResponse response) throws IOException {
        // TODO Auto-generated method stub
        
    }

    @Override
    public boolean hasError(ClientHttpResponse response) throws IOException {
        // TODO Auto-generated method stub
        return false;
    }
    
}
