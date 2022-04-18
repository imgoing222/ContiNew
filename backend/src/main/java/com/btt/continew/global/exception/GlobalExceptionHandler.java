package com.btt.continew.global.exception;

import java.io.IOException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        ErrorResponse response = ErrorResponse.from(errorCode);
        return ResponseEntity.status(errorCode.getHttpStatus()).body(response);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException exception) {
        ErrorResponse response = ErrorResponse.from(ErrorCode.GLOBAL_ILLEGAL_ERROR);
        return ResponseEntity.status(ErrorCode.GLOBAL_ILLEGAL_ERROR.getHttpStatus()).body(response);
    }

    @ExceptionHandler({RuntimeException.class, IOException.class})
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException exception) {
        ErrorResponse response = ErrorResponse.from(ErrorCode.GLOBAL_INTERNAL_SERVER_ERROR);
        return ResponseEntity.status(ErrorCode.GLOBAL_INTERNAL_SERVER_ERROR.getHttpStatus()).body(response);
    }
}
