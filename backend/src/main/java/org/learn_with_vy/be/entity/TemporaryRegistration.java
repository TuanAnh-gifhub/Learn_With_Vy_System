package org.learn_with_vy.be.entity;

import lombok.Builder;
import lombok.Data;
import org.learn_with_vy.be.dto.request.user.CreateUsersRequest;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "temporary_registration")
@Data
@Builder
public class TemporaryRegistration {
    @Id
    String email;

    CreateUsersRequest userRequest;

    String otp;

    @Indexed(expireAfter = "300s")
    LocalDateTime createdAt;
}
