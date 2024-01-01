package com.jay.core.swagger;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

/**
 * knife4j的配置
 * @author xxl
 * @since 2023/9/16
 */
@OpenAPIDefinition(
        info = @Info(
                title = "JAY-FM",description = "接口文档",version = "1.0.0",
                contact = @Contact(name = "james aks",email = "aksisnotx@gmail.com")
        ),
        servers = {
            @Server(url = "http://localhost:8080/",description = "本地环境"),
            @Server(url = "http://xxl.cab/song",description = "本地环境")
        }
)
@Configuration
public class SwaggerConfig {

}
