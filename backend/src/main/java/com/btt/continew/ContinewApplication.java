package com.btt.continew;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ContinewApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContinewApplication.class, args);
	}

}
