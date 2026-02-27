package org.learn_with_vy.be.service;

import jakarta.servlet.http.HttpServletRequest;
import org.learn_with_vy.be.dto.request.auth.LoginRequest;
import org.learn_with_vy.be.dto.response.auth.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest loginRequest);

    LoginResponse refresh(HttpServletRequest refreshRequest);

    LoginResponse loginWithGoogle(String email, String name, String googleId);
}
