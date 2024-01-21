package com.jay;

import com.jay.utils.IPUtils;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Indexed;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

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
@ServletComponentScan("com.jay.filter")
public class Application {

    public static void main(String[] args)  {
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

    @Bean
    public static ThreadPoolExecutor threadPoolExecutor() {
        int coreSize = 2;
        int maximumPoolSize = 4;
        int keepAliveTime = 60;
        TimeUnit timeUnit = TimeUnit.SECONDS;
        BlockingQueue<Runnable> queue = new ArrayBlockingQueue<>(50);
        RejectedExecutionHandler handler = new ThreadPoolExecutor.AbortPolicy();
        return new ThreadPoolExecutor(coreSize, maximumPoolSize, keepAliveTime, timeUnit, queue, new ThreadFactory() {
            private static final AtomicInteger COUNT = new AtomicInteger(0);
            @Override
            public Thread newThread(Runnable r) {
                int i = COUNT.addAndGet(1);
                return new Thread(r,"song-thread-" + i);
            }
        }, handler);
    }
}
