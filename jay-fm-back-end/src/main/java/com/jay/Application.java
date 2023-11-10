package com.jay;

import cn.hutool.system.SystemUtil;
import com.jay.utils.IPUtils;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Indexed;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * @author: anyone
 * @since: 2023/9/16
 * @description:  启动类
 */
@EnableAspectJAutoProxy
@EnableAsync
@EnableScheduling
@EnableTransactionManagement
@Slf4j
@Indexed
@MapperScan("**.mapper")
@SpringBootApplication
public class Application {

    public static void main(String[] args) throws UnknownHostException {
        try {
            SpringApplication.run(Application.class, args);
            log.info("项目启动成功(ง ˙o˙)ว");
        } catch (Exception e) {
            log.error("启动失败:",e);
        }
    }

    @Bean
    public static IPUtils ipUtils() {
        return IPUtils.getInstance("/data/ip2region.xdb");
    }
}
