package com.jay.core.resp;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serial;
import java.io.Serializable;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.OK;

/**
 * 统一响应基础类
 * @author xxl
 * @since 2023/9/16
 */
@Data
@Accessors(chain = true)
@Schema(description = "响应对象")
public  class RespEntity<T> implements Serializable {
    @Serial
    private static final long serialVersionUID = -3917323953100432259L;

    @Schema(description = "状态码")
    private int code;
    @Schema(description = "提示信息")
    private String message;
    @Schema(description = "返回数据")
    private T data;

    public RespEntity(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    /**
     * 基础方法
     * @param code
     * @param message
     * @param data
     * @return
     * @param <T>
     */
    public static <T> RespEntity<T> base(int code, String message, T data) {
        return new RespEntity<T>(code, message,data);
    }

    public static <T>  RespEntity<T> success(){
        String reasonPhrase = OK.getReasonPhrase();
        int value = OK.value();
        return RespEntity.base(value,reasonPhrase,null);
    }

    public static <T> RespEntity<T> success(String message, T t) {
        return base(200, message, t);
    }


    public static <T> RespEntity<T> success(int code, String message) {
        return base(code, message, null);
    }


    public static <T> RespEntity<T> success(String message) {
        return base(200, message, null);
    }

    public static <T> RespEntity<T> fail() {
        String reasonPhrase = INTERNAL_SERVER_ERROR.getReasonPhrase();
        int value = INTERNAL_SERVER_ERROR.value();
        return RespEntity.base(value,reasonPhrase,null);
    }

    public static <T> RespEntity<T> fail(String message) {
        return base(500, message, null);
    }


    public static <T> RespEntity<T> fail(String message, T t) {
        return base(500, message, t);
    }


    public static <T> RespEntity<T> fail(int code, String message) {
        return base(code, message, null);
    }
}
