package com.iamcamper.boot_imc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class BootImcApplication {

	public static void main(String[] args) {
		SpringApplication.run(BootImcApplication.class, args);
	}

}
