package org.learn_with_vy.be.service;

import org.learn_with_vy.be.base.PageResponse;
import org.learn_with_vy.be.dto.request.auth.ResetPasswordRequest;
import org.learn_with_vy.be.dto.request.user.CreateUsersRequest;
import org.learn_with_vy.be.dto.request.user.UpdateUserRequest;
import org.learn_with_vy.be.dto.response.UserResponse;
import org.learn_with_vy.be.entity.User;

import java.util.UUID;

public interface UserService {

    UserResponse createUser(CreateUsersRequest users);

    UserResponse getProfileUser();

    PageResponse<UserResponse> getAllUsers(int page, int size, String role, Boolean active, String keyword);

    User findByEmail(String name);

    User findByUserId(UUID id);

    void processForgotPassword(String email);

    void processResetPassword(ResetPasswordRequest request);

    void updateStatus(UUID id, Boolean active);

    UserResponse updateUser(UUID id, UpdateUserRequest request);
}
