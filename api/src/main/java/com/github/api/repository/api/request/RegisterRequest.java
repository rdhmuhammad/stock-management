package com.github.api.repository.api.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.github.api.repository.api.validation.columnduplicatevalidation.DuplicationInDB;
import com.github.api.repository.api.validation.columnduplicatevalidation.EnableAllDuplication;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@EnableAllDuplication
public class RegisterRequest {
    private String fullName;

    private String password;

    @DuplicationInDB
    private String email;

    @DuplicationInDB
    private String phone;

    private String address;

    private String companyId;

    @NotNull(message = "File cannot be null")
    private MultipartFile profilePicture;
}
