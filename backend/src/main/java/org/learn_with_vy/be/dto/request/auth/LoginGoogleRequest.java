package org.learn_with_vy.be.dto.request.auth;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginGoogleRequest {
    String code;
}
