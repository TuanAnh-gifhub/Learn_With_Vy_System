package org.learn_with_vy.be.repository.mongo;

import org.learn_with_vy.be.entity.RefreshToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {
    Optional<RefreshToken> findByTokenHashAndRevokedFalse(String tokenHash);

    void deleteByEmail(String email);

    void deleteByExpiresAtBefore(Instant now);
}
