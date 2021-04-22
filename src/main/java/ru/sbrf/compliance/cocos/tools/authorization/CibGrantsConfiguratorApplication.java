package ru.sbrf.compliance.cocos.tools.authorization;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class CibGrantsConfiguratorApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(CibGrantsConfiguratorApplication.class, args);
	}

}
