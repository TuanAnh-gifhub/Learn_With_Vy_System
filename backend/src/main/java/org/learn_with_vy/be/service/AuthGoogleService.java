package org.learn_with_vy.be.service;

import org.learn_with_vy.be.dto.response.auth.LoginGoogleResponse;

public interface AuthGoogleService {
    LoginGoogleResponse authenticate(String code);
}
