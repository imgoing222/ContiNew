package com.btt.continew.global.config;

import io.swagger.annotations.ApiParam;
import lombok.Getter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@EnableWebMvc
public class SwaggerConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html")
            .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**")
            .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
            .useDefaultResponseMessages(false)
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.btt.continew"))
            .paths(PathSelectors.any())
            .build()
            .apiInfo(apiInfo())
            .directModelSubstitute(Pageable.class, SwaggerPageable.class);
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
            .title("ContiNew API")
            .description("이어살기 중개 플랫폼 ContiNew입니다.")
            .version("1.0")
            .build();
    }

    @Getter
    private static class SwaggerPageable {

        @ApiParam(value = "페이지 크기 (기본값 10)", example = "10")
        @Nullable
        private Integer size;

        @ApiParam(value = "페이지 번호 (기본값 0)", example = "0")
        @Nullable
        private Integer page;

        @ApiParam(value = "정렬방식 (사용법: 컬럼명,asc|desc) * 컬럼명은 DB Table의 Column 이름")
        @Nullable
        private String sort;
    }
}
