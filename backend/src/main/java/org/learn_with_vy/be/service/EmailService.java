package org.learn_with_vy.be.service;

import org.learn_with_vy.be.dto.request.user.CreateUsersRequest;
import org.springframework.scheduling.annotation.Async;

public interface EmailService {
    void sendResetPasswordEmail(String toEmail, String resetUrl);
    void sendOtpRegister(CreateUsersRequest user);

    @Async
    void sendEmailVerification(String toEmail, String name, String otp);

    CreateUsersRequest verifyAndGetPendingUser(String email, String otp);

    void deletePendingUser(String email);
}
