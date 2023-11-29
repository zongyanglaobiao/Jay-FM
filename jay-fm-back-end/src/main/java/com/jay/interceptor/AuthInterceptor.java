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
    private static final String KEY = "24c5a289-afe1-4e49-8163-2ca146a27c46";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //todo 文件上传需要登录，在这里校验
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
