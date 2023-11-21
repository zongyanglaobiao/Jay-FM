package com.jay.interceptor;

import cn.hutool.core.util.StrUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * 过滤请求
 * @author xxl
 * @since 2023/11/21
 */
@Component
public class AuthInterceptor implements HandlerInterceptor {
    private static final String AUTH = "auth";
    private static final String KEY = "Vm10YWIyUXhXbkpOU0dSUVZsWmFWRlpyVmt0VlJsWnlXa1JDVDFac1NsaFdiWFJQWWtaSmQwNVdWbFZpUjFJeldWWlZlR05XUmxWaGVqQTk=";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String header = request.getHeader(AUTH);
        if (StrUtil.isNotBlank(header) && KEY.equals(header)) {
            return true;
        }
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().write("""
        <div style='width:  100%;height: 100%;display: flex;justify-content: center;align-items: center;'>
            <h1>拒绝访问</h1>
        </div>
        """);
        return false;
    }
}
