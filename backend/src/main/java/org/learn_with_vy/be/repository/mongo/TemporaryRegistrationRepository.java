package org.learn_with_vy.be.repository.mongo;

import org.learn_with_vy.be.entity.TemporaryRegistration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemporaryRegistrationRepository extends MongoRepository<TemporaryRegistration, String> {
}
