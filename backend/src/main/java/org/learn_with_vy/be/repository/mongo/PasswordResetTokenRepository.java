package org.learn_with_vy.be.repository.mongo;

import org.learn_with_vy.be.entity.PasswordResetToken;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetToken, String> {

    Optional<PasswordResetToken> findByToken(String token);

    void deleteByEmail(String email);
}